from flask import Flask
from flask_migrate import Migrate


def init_app(app: Flask):
   from app.models.icolabora_model import IcolaboraModel

   Migrate(app, app.db)
