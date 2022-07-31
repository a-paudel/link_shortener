from bottle import run, redirect, get, post, view, request
from app.database import get_link, create_code
import os
from dotenv import load_dotenv
load_dotenv()


@get("/")
@view("index")
def index():
    return dict()


# get route
@get("/<code>")
def redirect_to_link(code):
    # get link from code
    link = get_link(code)
    # if link exists, redirect to link
    if link:
        return redirect(link, 301)
    # if link doesn't exist, return 404
    return "404"


# create code for url
@post("/")
def create_code_for_url():
    # create code for url
    url = request.json.get("url")
    code = create_code(url)
    # redirect to code
    return code


run(
    debug=os.getenv("DEBUG", False),
    reloader=os.getenv("RELOADER", False),
    host=os.getenv("HOST", "0.0.0.0"),
    port=os.getenv("PORT", 8080),
)
