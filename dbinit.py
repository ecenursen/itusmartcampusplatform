
import os
import sys

import psycopg2 as dbapi2


INIT_STATEMENTS = [
    """CREATE TABLE IF NOT EXISTS USERS (
        USERNAME VARCHAR(50) NOT NULL PRIMARY KEY,
        PASSWORD VARCHAR(64) NOT NULL,
        ROLE NUMERIC(1) NOT NULL
    )""",
    """
    CREATE TABLE IF NOT EXISTS NODE(
        ID SERIAL PRIMARY KEY,
        LATITUDE DOUBLE PRECISION NOT NULL,
        LONGITUDE DOUBLE PRECISION NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS SMART_DATA(
        ID SERIAL PRIMARY KEY,
        COLLECT_TIME TIMESTAMP NOT NULL,
        RECEIVED_TIME TIMESTAMP NOT NULL,
        TYPE VARCHAR NOT NULL,
        VALUE DOUBLE PRECISION NOT NULL,
        VIA NUMERIC(1) NOT NULL,
        LATITUDE DOUBLE PRECISION NOT NULL,
        LONGITUDE DOUBLE PRECISION NOT NULL,
        NODE_ID INTEGER,
        FOREIGN KEY (NODE_ID) REFERENCES NODE(ID)
    )
    """,
]


def initialize(url):
    print("dropping tables")
    #drop_table(url)
    print("creating tables")
    with dbapi2.connect(url) as connection:
        cursor = connection.cursor()
        for statement in INIT_STATEMENTS:
            cursor.execute(statement)
        cursor.close()


if __name__ == "__main__":
    url = os.getenv("DATABASE_URL")
    if url is None:
        print("Usage: DATABASE_URL=url python dbinit.py", file=sys.stderr)
        sys.exit(1)
    initialize(url)


def drop_table(url):
    with dbapi2.connect(url) as connection:
        cursor = connection.cursor()
        cursor.execute("DROP SCHEMA public CASCADE;CREATE SCHEMA public;")
        cursor.close()