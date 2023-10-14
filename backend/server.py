import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
import os


app = FastAPI()
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
