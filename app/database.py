import os
from secrets import token_urlsafe
import peewee as p
from playhouse.db_url import connect

# postgres connection
db_url = os.getenv("DATABASE_URL")

db:p.PostgresqlDatabase = connect(db_url)

# create table link, id, url, code
class Link(p.Model):
    id = p.PrimaryKeyField()
    url = p.TextField()
    code = p.TextField()

    class Meta:
        database = db

# create tables
db.create_tables([Link])


# get link from code
def get_link(code):
    link = Link.get_or_none(Link.code == code)
    if link:
        return link.url
    return None

def create_code(url):
    def generate_code():
        temp_code = token_urlsafe()[:5]
        # if tempcode in db
        if get_link(temp_code):
            return generate_code()
        return temp_code

    code = generate_code()
    if get_link(code):
        return create_code(url)
    link = Link.create(url=url, code=code)
    return code