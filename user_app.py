from flask import Flask, request, render_template,redirect, url_for, Blueprint, session
from dbfunctions import find_user
from manager import manager

user = Blueprint(name='user', import_name=__name__,
                    template_folder='templates')

@user.route('/',methods=['GET'])
def user_page():
    session['login'] = None 
    return render_template("homepage.html")

@user.route('/login',methods=['GET','POST'])
def login():
    if request.method == "GET":
        return render_template("manager_auth.html",error=None)
    else:
        session['username'] = request.form['username']
        password = request.form['password']
        found = find_user(session['username'],password)
        if found:
            session['login'] = True
            session['sing_or_multi'] = "single"
            session['str_date_1'] = ""
            session['end_date_1'] = ""
            session['str_date_2'] = ""
            session['end_date_2'] = ""
            session['input'] = ""
            session['str_date'] = ''
            session['end_date'] = ''
            session['input1'] = ''
            session['input2'] = ''
            session['input3'] = ''
            return redirect(url_for('manager.manager_page'))
        else:
            return render_template("manager_auth.html",error="Username or password is wrong, try again!")

@user.route('/test',methods=['GET'])
def testing():
    return render_template("test.html")

@user.route('/logout',methods=['GET'])
def logout():
    session['login'] = None
    return redirect(url_for('user.user_page'))