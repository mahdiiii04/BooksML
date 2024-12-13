from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
from recommendation import Recommend

class BookRequest(BaseModel):
    books: List[str]

app = FastAPI()


origins = [
    "http://localhost:5173",  # Replace with the origin of your frontend application
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load the books dataset once during startup
books_df = pd.read_csv('Books.csv')
books_df = books_df[['id', 'title']]
@app.post("/recommend/")
async def recommend_books(request: BookRequest):
    try:
        recommended_books = Recommend(request.books)
        return {"recommendations": recommended_books.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_books/")
async def get_books():
    try:
        books_json = books_df.to_json(orient="records")
        return {"books": pd.read_json(books_json).to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


