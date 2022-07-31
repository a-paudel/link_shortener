from re import U
import sqlite3
from secrets import token_urlsafe
import time

# create connection
conn = sqlite3.connect("db.sqlite3")
# conn = sqlite3.connect("data/db.sqlite3")

# create table
def create_db():
    c = conn.cursor()

    # create table, link, url, code
    c.execute(
        """CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT not null unique,
        code TEXT not null unique
    )"""
    )

    conn.commit()
    c.close()


# get link from code
def get_link(code):
    c = conn.cursor()

    c.execute("SELECT url FROM links WHERE code = ?", (code,))
    link = c.fetchone()

    c.close()
    if link:
        return link[0]
    return None


# create code for link
def create_code(url):
    def generate_code():
        temp_code = token_urlsafe()[:5]
        # if tempcode in db
        if get_link(temp_code):
            return generate_code()
        return temp_code

    c = conn.cursor()

    # check if url exists in db
    c.execute("SELECT code FROM links WHERE url = ?", (url,))
    link = c.fetchone()
    # if exists, return code
    if link:
        c.close()
        return link[0]

    else:
        # create code
        code = generate_code()
        # insert code and url into db
        c.execute("INSERT INTO links (url, code) VALUES (?, ?)", (url, code))
        conn.commit()
        c.close()
        return code


create_db()
