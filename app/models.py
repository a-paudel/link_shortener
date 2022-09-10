from email.policy import default
import peewee
from playhouse.db_url import connect
import os
import secrets

db_url = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
db = connect(db_url)

class BaseModel(peewee.Model):
    class Meta:
        database = db
        schema = "link_shortener" if "postgres" in db_url else None

class Link(BaseModel):
    @staticmethod
    def generate_code():
        code = secrets.token_urlsafe()[:5]
        link = Link.get_or_none(code=code)
        if link:
            return Link.generate_code()
        return code
        
    
    url:str = peewee.CharField()
    code:str = peewee.CharField(default=generate_code, unique=True)


# create tables
db.create_tables([Link])