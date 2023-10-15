from node.base import Node

# Input node wih no source, only target
class TextOutput(Node):
    def process(self, inputs):
        return {"result": inputs.get("result")}
