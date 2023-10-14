import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()


origins = [
    "http://localhost:5173",  # Adjust this to the port your React app is running on
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/images", StaticFiles(directory="images"), name="images")


@app.get("/play/")
async def play(data):
    print(data)
    return {"status": "Data received and printed"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = str(uuid.uuid4()) + file_extension
    file_path = os.path.join("images", unique_filename)
    
    with open(file_path, "wb+") as buffer:
        buffer.write(file.file.read())
        
    return {"filename": unique_filename}
