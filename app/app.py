from flask import Flask, render_template, redirect, url_for, request
from app.models import Link
from app.api import router as api_router


app = Flask(__name__)
app.register_blueprint(api_router)

@app.get("/")
def home():
    return render_template("home.html")

@app.get("/show/<string:code>")
def show(code):
    link = Link.get_or_none(code=code)
    if link:
        return render_template("show.html", link=link)
    return redirect(url_for("home"))

@app.get("/<string:code>")
def redirect_to(code:str):
    link = Link.get_or_none(code=code)
    if link:
        return redirect(link.url, 301)
    return redirect(url_for("home"))