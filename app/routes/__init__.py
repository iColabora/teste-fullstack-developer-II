from app.routes.icolabora_blueprint import bp_icolabora
from flask import Flask

def init_app(app: Flask):
   app.register_blueprint(bp_icolabora)
