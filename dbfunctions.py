import os
import psycopg2 as db
import json
from flask import Flask, request, render_template,redirect, url_for, Blueprint, session
from datetime import datetime

url = os.environ.get('DATABASE_URL')
db_lora = Blueprint(name='db_lora', import_name=__name__, template_folder='templates')

@db_lora.route('/database/add_data',methods=['GET','POST'])
def add_data_to_database():
    if request.method == "GET":
        return render_template("add_data.html")
    else:
        json_data = request.get_json(force=True)
        print(format(json_data))
        collect_time = json_data["collect_time"]
        typ = json_data["type"]
        val = json_data["value"]
        via = json_data["via"]
        if via == 0:
            report = insert_into_smart_data_with_fixed_node(collect_time,typ,val,via,json_data["node_id"])
        else:
            report = insert_into_smart_data(collect_time,typ,val,via,json_data["lat"],json_data["lng"])
        print(report + format(json_data))
        return render_template("add_data_result.html",result=report)

"""
{
    "type": "air_quality;
    "collect_time":  ;
    "value": 671;
    "via": 0; # 0 -> fixed nodes 1-> non fixed node
    "node_id" : 1,
},

{
    "type": "air_quality;
    "collect_time":  ;
    "value": 671;
    "via": 1; # 0 -> fixed nodes 1-> non fixed node
    "lat" : 75.43,
    "lng" : 32.123,
}
"""

def insert_into_users(user,passwrd):
    
    connection = db.connect(url)
    cursor=connection.cursor()
    statement="""INSERT INTO USERS(USERNAME,PASSWORD) VALUES (\'{}\', \'{}\')""".format(user,passwrd)
    cursor.execute(statement)
    connection.commit()
    cursor.close()
    return

def insert_into_node(lng,lat):
    connection = db.connect(url)
    cursor=connection.cursor()
    statement="""INSERT INTO NODE(LATITUDE,LONGITUDE) VALUES (\'{}\', \'{}\')""".format(lng,lat)
    cursor.execute(statement)
    connection.commit()
    cursor.close()
    return

def insert_into_smart_data(c_time,typ,val,via,lng,lat):
    connection = db.connect(url)
    cursor=connection.cursor() 
    rcv_time = datetime.now()
    statement="""INSERT INTO SMART_DATA(COLLECT_TIME,RECEIVED_TIME,TYPE,VALUE,VIA,LATITUDE,LONGITUDE) VALUES ( \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\')""".format(c_time,rcv_time,typ,val,via,lng,lat)
    cursor.execute(statement)
    connection.commit()
    cursor.close()
    return 0

def insert_into_smart_data_with_fixed_node(c_time,typ,val,via,n_id=0):
    connection = db.connect(url)
    cursor=connection.cursor()
    if n_id != 0:
        lat, lng = find_node_location(n_id)
        rcv_time = datetime.now()
        statement="""INSERT INTO SMART_DATA(COLLECT_TIME,RECEIVED_TIME,TYPE,VALUE,VIA,LATITUDE,LONGITUDE,NODE_ID) VALUES (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\')""".format(c_time,rcv_time,typ,val,via,lat,lng,n_id)
        cursor.execute(statement)
        connection.commit()
        cursor.close()
    return 0

def find_user(usr,pssw):
    found = False
    connection = db.connect(url)
    cursor=connection.cursor()
    find="""SELECT * FROM USERS WHERE USERNAME =\'{}\' AND PASSWORD=\'{}\'""".format(usr,pssw)
    cursor.execute(find)
    connection.commit()
    result = cursor.fetchone()
    if not result is None and len(result) > 0:
        found = True
    cursor.close()
    return found

def find_node_location(n_id):
    connection = db.connect(url)
    cursor=connection.cursor()
    find="""SELECT * FROM NODE WHERE ID =\'{}\'""".format(n_id)
    cursor.execute(find)
    connection.commit()
    lng = 0
    lat = 0
    for row in cursor:
        lat = row[1]
        lng = row[2]
    cursor.close()
    return lat,lng

def find_nodes():
    nodes = []
    connection = db.connect(url)
    cursor=connection.cursor()
    find="""SELECT * FROM NODE """
    cursor.execute(find)
    connection.commit()
    for row in cursor:
        nodes.append(row)
    cursor.close()
    return nodes

def find_data(typ,date_str=None,date_end=None):
    datas = []
    connection = db.connect(url)
    cursor=connection.cursor()
    if date_end == None:
        date_end = datetime.now()
    if date_str == None:
        find="SELECT VALUE FROM SMART_DATA WHERE TYPE == '" +typ + "'"
    else:
        find="SELECT VALUE FROM SMART_DATA WHERE TYPE == '" +typ + "' AND COLLECT_TIME > '" + date_str + "' AND COLLECT_TIME < '" + date_end + "'"
    cursor.execute(find)
    connection.commit()
    for row in cursor:
        datas.append(row)
    cursor.close()
    return datas
