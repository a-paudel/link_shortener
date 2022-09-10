from flask import Blueprint, request
from app.models import Link
from playhouse.shortcuts import model_to_dict

router = Blueprint('api', __name__, url_prefix='/api')


@router.post("/shorten")
def shorten():
    data = request.json
    url = data.get("url")
    code = data.get("code")
    code = None if code == "" else code
    
    link = Link.get_or_none(code=code)
    if not link:
        link = Link()
        link.url = url
        if code:
            link.code = code
        link.save()
    return model_to_dict(link)


@router.post("/check")
def check():
    """
    Check if a code is available
    """
    code = request.json.get("code")
    if code == "" or code is None:
        return {"available": False}

    link = Link.get_or_none(code=code)
    return {"available": link is None}