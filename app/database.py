# from re import U
# import sqlite3
# from secrets import token_urlsafe
# import time
# import os

# # create connection
# if os.getenv("ENV", "PROD") == "DEV":
#     conn = sqlite3.connect("db.sqlite3")
# else:
#     conn = sqlite3.connect("data/db.sqlite3")

# # create table
# def create_db():
#     c = conn.cursor()

#     # create table, link, url, code
#     c.execute(
#         """CREATE TABLE IF NOT EXISTS links (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         url TEXT not null unique,
#         code TEXT not null unique
#     )"""
#     )

#     conn.commit()
#     c.close()


# # get link from code
# def get_link(code):
#     c = conn.cursor()

#     c.execute("SELECT url FROM links WHERE code = ?", (code,))
#     link = c.fetchone()

#     c.close()
#     if link:
#         return link[0]
#     return None


# # create code for link
# def create_code(url):
#     def generate_code():
#         temp_code = token_urlsafe()[:5]
#         # if tempcode in db
#         if get_link(temp_code):
#             return generate_code()
#         return temp_code

#     c = conn.cursor()

#     # check if url exists in db
#     c.execute("SELECT code FROM links WHERE url = ?", (url,))
#     link = c.fetchone()
#     # if exists, return code
#     if link:
#         c.close()
#         return link[0]

#     else:
#         # create code
#         code = generate_code()
#         # insert code and url into db
#         c.execute("INSERT INTO links (url, code) VALUES (?, ?)", (url, code))
#         conn.commit()
#         c.close()
#         return code


# create_db()

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