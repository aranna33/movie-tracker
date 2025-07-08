from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import psycopg2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo/dev, allow all. Lock down in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Movie(BaseModel):
    title: str
    director: str

@app.post("/movies")
def create_movie(movie: Movie):
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        database=os.getenv("DB_NAME", "moviesdb"),
        user=os.getenv("DB_USER", "movieuser"),
        password=os.getenv("DB_PASSWORD", "password123")
    )

    cur = conn.cursor()
    cur.execute(
        "INSERT INTO movies (title, director) VALUES (%s, %s) RETURNING id;",
        (movie.title, movie.director)
    )
    movie_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return {"id": movie_id, "title": movie.title, "director": movie.director}

@app.get("/movies")
def list_movies():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        database=os.getenv("DB_NAME", "moviesdb"),
        user=os.getenv("DB_USER", "movieuser"),
        password=os.getenv("DB_PASSWORD", "password123")
    )
    cur = conn.cursor()
    cur.execute("SELECT id, title, director FROM movies;")
    movies = [{"id": row[0], "title": row[1], "director": row[2]} for row in cur.fetchall()]
    cur.close()
    conn.close()
    return movies

@app.get("/")
def root():
    return {"msg": "Movie Tracker backend is running!"}
