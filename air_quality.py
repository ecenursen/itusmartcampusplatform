import os
from flask import Flask, request, render_template,redirect, url_for, Blueprint, session
from dbfunctions import find_nodes
import json
import random

airquality = Blueprint(name='airquality', import_name=__name__,
                    template_folder='templates')

@airquality.route('/air_quality',methods=['GET'])
def air_quality():
    map_colors = []
    for i in range(8):
        map_c = []
        for j in range(15):
            map_c.append(random.randint(0,4))
        map_colors.append(map_c)
    map_color = {'map_colors':map_colors}
    jsmapcol = json.dumps(map_color)
    node = find_nodes()
    data = {'nodes': node }
    jsData = json.dumps(data)
    return render_template("airquality.html",nodes=jsData,map_colors=jsmapcol)


