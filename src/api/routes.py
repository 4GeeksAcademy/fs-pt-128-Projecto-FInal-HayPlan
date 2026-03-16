"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re  # Para expresiones regulares
import os  # Para leer la API KEY del .env
import requests  # Para peticiones a Ticketmaster
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, Plan, PlanStatus, Vote
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timezone

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
    # Recibe y verifica el nombre de usuario del formulario
    username = data.get('username')

    # Valida que tenga username
    if not email or not password or not username:
        return jsonify({"error": "Email, contraseña y nombre de usuario son requeridos"}), 400

    # Validación de formato de email (Regex)
    email_regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not re.match(email_regex, email):
        return jsonify({"error": "¡Hey! Revisa tu correo, parece que le falta algo (como el @ o el .com). 📧"}), 400

    # Verificamos si el email ya existe
    existing_user_email = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()
    if existing_user_email:
        return jsonify({"error": "¡Ups! Parece que ya tienes una cuenta con nosotros. Intenta iniciar sesión."}), 400

    # Verifica si el username ya existe para evitar errores de duplicidad
    existing_username = db.session.execute(db.select(User).where(
        User.username == username)).scalar_one_or_none()
    if existing_username:
        return jsonify({"error": "¡Vaya! Parece que ese nombre ya tiene dueño. 😅 Intenta con uno diferente o añade algún toque personal."}), 400

     # Si todo esta Ok, se crea el usuario incluyendo el username
    new_user = User(email=email, username=username, is_active=True)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "¡Registro exitoso! Ya puedes iniciar sesión."}), 201

# Ruta para el Login (inicio de sesión)


@api.route('/login', methods=['POST'])
def login():
    # Verifica que el email y password estén creados
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    # Busco al usuario por su email
    user = db.session.execute(db.select(User).where(
        User.email == email)).scalar_one_or_none()

    if user is None:
        return jsonify({"error": "Email o contraseña invalido"}), 401

    # Si el usuario existe y la contraseña es correcta (Uso el método check_password)
    if user and user.check_password(password):
        # Creamos el token de acceso
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"msg": "Login correcto", "token": access_token, "user_id": user.serialize()}), 200

    # Si algo falla, devolvemos un error por seguridad
    else:
        return jsonify({"error": "Algo no cuadra, revisa tu email o contraseña."}), 401

# Ruta para el Username


@api.route('/editProfile', methods=['PUT'])
@jwt_required()
def update_private():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    username = data.get("username")

    if not username:
        return jsonify({"error": "username es required"}), 400

    existing = db.session.execute(
        db.select(User).where(User.username == username, User.id != user.id)
    ).scalar_one_or_none()

    if existing:
        return jsonify({"error": "El usuario ya existe"}), 400

    user.username = username

    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200


# PF

# --------------------- RUTAS GRUPO ---------------------
# Lista de todos los grupos.
@api.route("/groups", methods=["GET"])
@jwt_required()
def get_groups():
    user_id = int(get_jwt_identity())
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify([group.serialize() for group in user.groups]), 200

# Grupo individual


@api.route("/groups/<int:group_id>", methods=["GET"])
def get_group(group_id):
    group = db.session.get(Group, group_id)

    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    return jsonify(group.serialize()), 200

# Crear grupo


@api.route("/groups", methods=["POST"])
@jwt_required()
def create_group():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    admin_id = int(get_jwt_identity())

    if not name or not admin_id:
        return jsonify({"error": "Nombre de grupo y ID son requeridos"}), 400

    user_id = int(get_jwt_identity())
    if not user_id:
        return jsonify({"error": "Usuario no encontrado"}), 404

    new_group = Group(
        name=name,
        description=description,
        admin_id=admin_id,
    )

    admin = db.session.get(User, admin_id)
    new_group.members.append(admin)

    db.session.add(new_group)
    db.session.commit()

    return jsonify(new_group.serialize()), 201

# Actualizar/editar grupo


@api.route("/groups/<int:group_id>", methods=["PUT"])
@jwt_required()
def update_group(group_id):
    group = db.session.get(Group, group_id)

    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    user_id = int(get_jwt_identity())
    if group.admin_id != user_id:
        return jsonify({"error": "Solo el admin puede modificar el grupo"}), 403

    data = request.get_json()
    name = data.get("name")
    description = data.get("description")

    if name:
        group.name = name

    if description:
        group.description = description

    db.session.commit()
    return jsonify(group.serialize()), 200

# Eliminar grupo


@api.route("/groups/<int:group_id>", methods=["DELETE"])
@jwt_required()
def delete_group(group_id):
    group = db.session.get(Group, group_id)

    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    user_id = int(get_jwt_identity())
    if group.admin_id != user_id:
        return jsonify({"error": "Solo el admin puede modificar el grupo"}), 403

    db.session.delete(group)
    db.session.commit()

    return jsonify({"msg": "Group eliminado"}), 200

# Lista de miembros del grupo


@api.route("/groups/<int:group_id>/members", methods=["GET"])
@jwt_required()
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

# Agregar usuarios a un grupo


@api.route("/groups/<int:group_id>/members", methods=["POST"])
@jwt_required()
def add_member_group(group_id):
    group = db.session.get(Group, group_id)

    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    data = request.get_json()
    user_id = data.get("user_id")
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

# Eliminar un miembro del grupo


@api.route("/groups/<int:group_id>/members/<int:user_id>", methods=["DELETE"])
@jwt_required()
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


# — Plan ——————————————————————————————————————————————————
@api.route('/plans', methods=['GET'])
@jwt_required()
def get_my_plans():
    user_id = int(get_jwt_identity())
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    my_groups_id = [group.id for group in user.groups]
    if not my_groups_id:
        return jsonify({"error": "No se encontró ningún grupo asociado a tu cuenta"}), 404
    plans = db.session.execute(select(Plan).where(Plan.group_id.in_(
        my_groups_id)).order_by(Plan.created_at.desc())).scalars().all()
    return jsonify([plan.serialize() for plan in plans]), 200


@api.route('/groups/<int:group_id>/plans', methods=['GET'])
@jwt_required()
def get_group_plans(group_id):
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    group = db.session.get(Group, group_id)
    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    if group not in user.groups:
        return jsonify({"error": "No tienes acceso a este grupo"}), 403

    plans = db.session.execute(select(Plan).where(
        Plan.group_id == group_id).order_by(Plan.created_at.desc())).scalars().all()
    return jsonify([plan.serialize() for plan in plans]), 200


@api.route('/groups/<int:group_id>/plans', methods=['POST'])
@jwt_required()
def create_plan(group_id):
    user_id = int(get_jwt_identity())
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    title = data.get("title")
    description = data.get("description", "")
    location = data.get("location", "")
    date = data.get("date")

    if not data or not title or not date:
        return jsonify({"error": "El título y fecha son obligatorios"}), 400

    group = db.session.get(Group, group_id)
    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    if group not in user.groups:
        return jsonify({"error": "No tienes acceso a este grupo"}), 403

    plan = Plan(
        title=title,
        description=description,
        group_id=group.id,
        organizer_id=user.id,
        location=location,
        date=date
    )
    db.session.add(plan)
    db.session.commit()
    return jsonify(plan.serialize()), 201


@api.route('/groups/<int:group_id>/plans/<int:plan_id>', methods=['GET'])
@jwt_required()
def get_plan(group_id, plan_id):
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    group = db.session.get(Group, group_id)
    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    if group not in user.groups:
        return jsonify({"error": "No tienes acceso a este grupo"}), 403

    plan = db.session.get(Plan, plan_id)
    if not plan or plan.group_id != group_id:
        return jsonify({"error": "Plan no encontrado"}), 404
    return jsonify(plan.serialize()), 200


@api.route('/groups/<int:group_id>/plans/<int:plan_id>', methods=['PUT'])
@jwt_required()
def update_plan(group_id, plan_id):
    user_id = int(get_jwt_identity())
    plan = db.session.get(Plan, plan_id)
    if not plan or plan.group_id != group_id:
        return jsonify({"error": "Plan no encontrado"}), 404

    if plan.organizer_id != user_id:
        return jsonify({"error": "Solo el organizador puede actualizar este plan"}), 403

    data = request.get_json()
    for field in ["title", "description", "location", "date"]:
        if field in data:
            setattr(plan, field, data[field])

    db.session.commit()
    return jsonify(plan.serialize()), 200


@api.route('/groups/<int:group_id>/plans/<int:plan_id>/advance_status', methods=['POST'])
@jwt_required()
def advance_status(group_id, plan_id):
    user_id = int(get_jwt_identity())
    plan = db.session.get(Plan, plan_id)
    if not plan or plan.group_id != group_id:
        return jsonify({"error": "Plan no encontrado"}), 404

    if plan.organizer_id != user_id:
        return jsonify({"error": "Solo el organizador puede actualizar este plan"}), 403

    order = [
        PlanStatus.PROPUESTA,
        PlanStatus.VOTACION,
        PlanStatus.CONFIRMADO,
        PlanStatus.ACTIVO,
        PlanStatus.CERRADO
    ]

    index = order.index(plan.status)
    if index < len(order) - 1:
        plan.status = order[index + 1]
        if plan.status == PlanStatus.CERRADO:
            plan.close_at = datetime.now(timezone.utc)
        db.session.commit()

    return jsonify(plan.serialize()), 200


# — Votes ——————————————————————————————————————————————————
@api.route('/groups/<int:group_id>/plans/<int:plan_id>/vote', methods=['POST'])
@jwt_required()
def vote_plan(group_id, plan_id):
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    group = db.session.get(Group, group_id)
    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    if group not in user.groups:
        return jsonify({"error": "No tienes acceso a este grupo"}), 403

    plan = db.session.get(Plan, plan_id)
    if not plan:
        return jsonify({"error": "Plan no encontrado"}), 404

    if plan.group_id != group_id:
        return jsonify({"error": "El plan no pertenece al grupo"}), 400

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    if "vote" not in data:
        return jsonify({"error": "El voto es obligatorio"}), 400

    vote = data["vote"]
    if not isinstance(vote, bool):
        return jsonify({"error": "El voto debe ser true o false"}), 400

    existing = db.session.execute(select(Vote).where(
        Vote.plan_id == plan_id,
        Vote.user_id == user.id
    )).scalar_one_or_none()
    if existing:
        existing.vote = vote
    else:
        db.session.add(Vote(
            plan_id=plan_id,
            user_id=user.id,
            vote=vote
        ))
    db.session.commit()
    return jsonify({"msg": "Voto registrado"}), 200


@api.route('/groups/<int:group_id>/plans/<int:plan_id>/votes', methods=['GET'])
@jwt_required()
def get_votes(group_id, plan_id):
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    group = db.session.get(Group, group_id)
    if not group:
        return jsonify({"error": "Grupo no encontrado"}), 404

    if group not in user.groups:
        return jsonify({"error": "No tienes acceso a este grupo"}), 403

    plan = db.session.get(Plan, plan_id)
    if not plan:
        return jsonify({"error": "Plan no encontrado"}), 404

    if plan.group_id != group_id:
        return jsonify({"error": "El plan no pertenece al grupo"}), 400

    votes = db.session.execute(select(Vote).where(
        Vote.plan_id == plan_id)).scalars().all()
    summary = {
        "si": sum(1 for vote in votes if vote.vote is True),
        "no": sum(1 for vote in votes if vote.vote is False),
        "total": len(votes)
    }
    return jsonify({
        "votes": [vote.serialize() for vote in votes],
        "summary": summary
    }), 200

    # Ruta para obtener eventos de Ticketmaster. ------------------------------------


@api.route('/ticketmaster-events', methods=['GET'])
def get_ticketmaster_events():
    api_key = os.getenv("TICKETMASTER_API_KEY")

    if not api_key:
        return jsonify({"error": "API Key no configurada"}), 500

    # CAPTURA la ciudad que viene del Frontend
    city = request.args.get('city')

    url = f"https://app.ticketmaster.com/discovery/v2/events.json?apikey={api_key}"

    if city:
        url += f"&city={city}"

    try:
        response = requests.get(url)
        response.raise_for_status()

        data = response.json()

        return jsonify(data), 200

    except requests.exceptions.RequestException as e:
        # Manejo de errores de conexión o de la API externa
        return jsonify({"error": "Error al conectar con Ticketmaster", "details": str(e)}), 502
