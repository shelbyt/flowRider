class Edge:
    def __init__(self, source, target):
        """
        Initializes a new instance of the class.

        Args:
            source (any): The source value.
            target (any): The target value.
        """
        self.source = source
        self.target = target

    def __repr__(self):
        return f"Edge(From: {self.source.id}, To: {self.target.id})"
