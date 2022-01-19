from flask import request, current_app, jsonify
from http import HTTPStatus
from app.models.icolabora_model import IcolaboraModel


def list_fields():
    fields_list = IcolaboraModel.query.all()
    return jsonify(fields_list), HTTPStatus.OK


def create_fields():
    
    session = current_app.db.session

    data = request.get_json()
    
    new_fields = IcolaboraModel(**data)
          
    session.add(new_fields)
    session.commit()

    return jsonify(new_fields), HTTPStatus.CREATED
