"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re # Importamos la librería para expresiones regulares
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

