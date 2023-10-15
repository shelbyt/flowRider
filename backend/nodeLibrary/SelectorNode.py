from node.base import Node
import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import requests
from io import BytesIO
from torchvision.io import read_image
from torchvision.models import mobilenet_v3_small, MobileNet_V3_Small_Weights
import os




class SelectorNode(Node):
    def process(self, inputs):
        # Extract the image data
        print("Inputs:=========")
        print(inputs)
        image_data = inputs.get("imageUpload")
        
        # Use the specified ML model to process the image
        model_type = self.params.get("model_type")
        result = self.run_ml_model(image_data, model_type)
        
        return {"result": result}
    
    def run_ml_model(self, image_url, model_type):
            # Load the MobileNet model (pre-trained on ImageNet)

        weights = MobileNet_V3_Small_Weights.DEFAULT
        model = mobilenet_v3_small(weights=weights)
        model.eval()  # Set the model to evaluation mode

        # Load the image from the given URL
        print(f'--------> {image_url}')
        print(os.getcwd())
        filename = os.path.basename(image_url)
        img = read_image("/home/shelbyt/workspace/flowRider/backend/images/" + filename)
        # response = requests.get(image_url)
        # img = Image.open(BytesIO(response.content))

        preprocess = weights.transforms()
        batch = preprocess(img).unsqueeze(0)
        print("starting prediction")
        prediction = model(batch).squeeze(0).softmax(0)

        print("classid")
        class_id = prediction.argmax().item()
        score = prediction[class_id].item()
        category_name = weights.meta["categories"][class_id]


        # Here, I'm just returning the index of the predicted class. 
        # In a real-world scenario, you'd probably map this to a human-readable class name.
        #return str(predicted_class_idx)
        print(f"Processed {image_url} with {model_type} result={category_name}: {100 * score:.1f}%")
        return f"Processed {image_url} with {model_type} result={category_name}: {100 * score:.1f}%"
