from flask import Flask, render_template
app = Flask(__name__,static_url_path='/static')

@app.route('/')
def home_page():
    return render_template("homepage.html")

@app.route('/air_quality/')
def air_quality():
    return render_template("airquality.html")

if __name__ == "__main__":
    app.run()