"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re  # Librería para expresiones regulares
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

# Ruta para el Login (inicio de sesión)

@api.route('/login', methods=['POST'])
def login():
    # Verifico que el email y password estén creados
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Verifico que el email y password existan en la petición
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
        return jsonify({"error": "Correo o contraseña incorrectos. Por favor, intenta de nuevo"}), 401



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
        return jsonify ({"error": "El usuario ya existe"}), 400
    
    user.username = username

    db.session.commit()
    return jsonify (user.serialize()), 200

@api.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200



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
            plan_id = plan_id,
            user_id = user.id,
            vote = vote
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
    
    votes = db.session.execute(select(Vote).where(Vote.plan_id == plan_id)).scalars().all()
    summary = {
        "si": sum(1 for vote in votes if vote.vote is True),
        "no": sum(1 for vote in votes if vote.vote is False),
        "total": len(votes)
    }
    return jsonify({
        "votes": [vote.serialize() for vote in votes],
        "summary": summary
    }), 200