"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re # Importamos la librería para expresiones regulares
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Ruta para el registro (Signup)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    # Validación de formato de email (Regex)
    email_regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del correo electrónico no es válido"}), 400

    # Verificamos si el usuario ya existe
    existing_user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()
    if existing_user:
        return jsonify({"error": "¡Ups! Parece que ya tienes una cuenta con nosotros. Intenta iniciar sesión."}), 400

     # Si todo esta Ok, se crea el usuario
    new_user = User(email=email, is_active=True)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "¡Registro exitoso! Ya puedes iniciar sesión."}), 201


#PF

# --------------------- RUTAS GRUPO ---------------------
#Lista de todos los grupos. 
@api.route("/groups", methods=["GET"])
def get_groups():
    groups = db.session.execute(db.select(Group)).scalars().all()
    return jsonify([group.serialize() for group in groups]), 200

#Grupo individual
@api.route("/groups/<int:group_id>", methods=["GET"])
def get_group(group_id):
    group = db.session.get(Group, group_id)

    if not group: 
        return jsonify({"error": "Grupo no encontrado"}), 404

    return jsonify(group.serialize()), 200

#Crear grupo
@api.route("/groups", methods=["POST"])
def create_group():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    admin_id = data.get("admin_id")

    if not name or not admin_id:
        return jsonify({"error": "Nombre de grupo y ID son requeridos"}), 400

    new_group = Group (
        name = name,
        description = description,
        admin_id = admin_id,
    )

    db.session.add(new_group)
    db.session.commit()

    return jsonify(new_group.serialize()), 200

#Actualizar/editar grupo
@api.route("/groups/<int:group_id>", methods=["PUT"])
def update_group(group_id):
    group = db.session.get(Group, group_id)

    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")

    if name: 
        group.name = name

    if description:
        group.description = description

    db.session.commit()
    return jsonify(group.serialize()), 200

#Eliminar grupo
@api.route("/groups/<int:group_id>", methods=["DELETE"])
def delete_group(group_id):
    group = db.session.get(Group, group_id)

    if not group: 
        return jsonify({"error": "Grupo no encontrado"}), 404

    db.sesion.delete(group)
    db.sesion.commit()

    return jsonify({"msg": "Group eliminado"}), 200

#Lista de miembros del grupo
@api.route("/groups/<int:group_id>/members", methods=["GET"])
def get_group_members(group_id): 
    group = db.session.get(Group, group_id)

    if not group: 
        return jsonify({"error": "Grupo no encontrado"}), 404
    
    members = [
        {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }

        for user in group.members
    ]
    return jsonify(members), 200

#Agregar usuarios a un grupo
@api.route("/groups/<int:group_id>/members", methods=["POST"])
def add_member_group(group_id):
    group = db.session.get(group_id)

    if not group: 
        return jsonify({"error": "Grupo no encontrado"}), 404
    
    data = request.get_json()
    user_id = data.get_json("user_id")
    if not user_id: 
        return jsonify({"error": "Ingresar ID del usuario"}), 404

    user = db.session.get(User, user_id)
    if not user: 
        return jsonify({"error": "Usuario no existe"}), 404
    
    if user in group.members: 
        return jsonify({"error": "Ya el usuario esta en el grupo!"}), 404
    
    group.members.append(user)
    db.session.commit()

    return jsonify({"msg": "Nuevo usuario agregado"}), 200

#Eliminar un miembro del grupo
@api.route("/groups/<int:group_id>/members/<int:user_id>", methods=["DELETE"])
def remove_member_group(group_id, user_id):
    group = db.session.get(Group, group_id)

    if not group: 
        return jsonify({"error": "Grupo no encontrado"}), 404

    user = db.session.get(User, user_id)
    if not user: 
        return jsonify({"error": "Usuario no existe"}), 404
    if user not in group.members: 
        return jsonify({"error": "Usuario no es parte del grupo!"}), 400

    group.members.remove(user)
    db.session.commit()

    return jsonify({"msg": "Usuario eliminado"}), 200


#-PF
