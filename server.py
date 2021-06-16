import os
from flask import Flask, Blueprint,session
from user_app import user
from manager import manager
from air_quality import airquality
from dbinit import drop_table, initialize
from dbfunctions import db_lora

app = Flask(__name__,static_url_path='/static')
app.config['SECRET_KEY'] = 'AIzaSyBEc4h3XFnRPZP2whtrt1'

app.register_blueprint(user)
app.register_blueprint(manager)
app.register_blueprint(airquality)
app.register_blueprint(db_lora)


heroku = True

if(heroku==False):
    os.environ['DATABASE_URL'] ="dbname='postgres' user='postgres' host='160.75.26.9' password='iotVital1773!' port='5432'"
    initialize(os.environ.get('DATABASE_URL'))

if __name__ == "__main__":
    if heroku:
        app.run()
    else:
        app.run(host="160.75.26.9",debug=True)