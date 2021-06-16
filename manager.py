from flask import Flask, request, render_template,redirect, url_for, Blueprint, session
import json
import random

manager = Blueprint(name='manager', import_name=__name__,
                    template_folder='templates')

def generate_inputs():
    data = {'sing_or_multi' : session['sing_or_multi'],
            'str_date_1': session['str_date_1'], 
            'end_date_1': session['end_date_1'],
            'str_date_2': session['str_date_2'], 
            'end_date_2': session['end_date_2'],
            'input': session['input'],
            'str_date': session['str_date'], 
            'end_date': session['end_date'],
            'input1': session['input1'], 
            'input2': session['input2'],
            'input3': session['input3']
        }
    jsData = json.dumps(data)
    print("MYJSON",jsData)
    return jsData

def generate_data(data_array):
    data = {"data":data_array}
    jsData = json.dumps(data)
    return jsData

def set_session_values():
    if session['sing_or_multi'] == "single":
        session['str_date'] = ""
        session['end_date'] = ""
        session['input1'] = ""
        session['input2'] = ""
        session['input3'] = ""
        session['str_date_1'] = request.form['Start1']
        session['end_date_1'] = request.form['End1']
        session['str_date_2'] = request.form['Start2']
        session['end_date_2'] = request.form['End2']
        session['input'] = request.form['input_data']
    else:
        session['str_date_1'] = ""
        session['end_date_1'] = ""
        session['str_date_2'] = ""
        session['end_date_2'] = ""
        session['input'] = ""
        session['str_date'] = request.form['Start']
        session['end_date'] = request.form['End']
        session['input1'] = request.form['input_data_1']
        session['input2'] = request.form['input_data_2']
        session['input3'] = request.form['input_data_3']
    return

def generate_regres():
    data = []
    temp = ["Air Quality February","Air Quality March"]
    data.append(temp)
    for i in range(30):
        temp = []
        temp.append(random.randint(300,1000))
        temp.append(random.randint(300,1000))
        data.append(temp)
    return data

@manager.route('/manager',methods=['GET','POST'])
def manager_page():
    if not('login' in session.keys()) or session['login']!= True :
        print("here")
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        return render_template("managerpage.html",inputs=generate_inputs())
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.general_page'))

@manager.route('/manager/overview',methods=['GET','POST'])
def general_page():
    if session['login']!= True:
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        mydata = generate_data(generate_regres())
        return render_template("general_page.html",inputs=generate_inputs(),error=None,data=mydata)
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.general_page'))

@manager.route('/manager/regression',methods=['GET','POST'])
def regression_page():
    if session['login']!= True:
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        mydata = generate_data(generate_regres())
        error = "Warning: Data for air quality has been mostly collected by collectors."
        return render_template("regression_page.html",inputs=generate_inputs(),error=error,data=mydata)
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.regression_page'))

@manager.route('/manager/comparison',methods=['GET','POST'])
def comparison_page():
    if session['login']!= True:
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        error = """Lightning data is not available. 
        Indoor Voice data is not available."""
        return render_template("comparison_page.html",inputs=generate_inputs(),error=error,data=generate_data([]))
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.comparison_page'))

@manager.route('/manager/barchart',methods=['GET','POST'])
def barchart_page():
    if session['login']!= True:
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        return render_template("barchart_page.html",inputs=generate_inputs(),error=None)
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.barchart_page'))

@manager.route('/manager/piechart',methods=['GET','POST'])
def piechart_page():
    if session['login']!= True:
        return redirect(url_for('manager.unauth_page'))
    if request.method == "GET":
        return render_template("piechart_page.html",inputs=generate_inputs(),error=None)
    else:
        session['sing_or_multi'] = request.form['sing_or_multi']
        set_session_values()
        return redirect(url_for('manager.piechart_page'))

@manager.route('/manager/unauth',methods=['GET'])
def unauth_page():
    return render_template("unauthenticated.html")
    