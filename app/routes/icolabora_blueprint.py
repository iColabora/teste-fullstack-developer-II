from flask import Blueprint
from app.controllers.icolabora_controller import (
    create_fields, 
    list_fields,
)

bp_icolabora = Blueprint("bp_icolabora", __name__, url_prefix="/icolabora")

bp_icolabora.post('')(create_fields)
bp_icolabora.get('')(list_fields)