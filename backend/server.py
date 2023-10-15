import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from graph.utils import create_graph_from_reactflow_dict
from graph.utils import visualize_graph


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


@app.post("/play/")
async def play(data: dict):
    print("data received")
    print(data)
    graph = create_graph_from_reactflow_dict(data)
    result = graph.execute()
    return {
        "status": "Data received and printed",
        "graph": str(result.get("category") + ", " + str(result.get("score")) + "%"),
    }


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = str(uuid.uuid4()) + file_extension
    file_path = os.path.join("images", unique_filename)

    with open(file_path, "wb+") as buffer:
        buffer.write(file.file.read())

    return {"filename": unique_filename}
