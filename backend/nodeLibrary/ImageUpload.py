from node.base import Node

# Input node wih no source, only target
class ImageUpload(Node):
    def process(self, _inputs):  # _inputs is unused for InputNode
        # Return the image URL stored in its params
        return {"image_url": self.params.get("inputImage")}
