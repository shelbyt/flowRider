class Node:
    def __init__(self, id, data=None, node_type=None, params=None):
        """
        Initializes a new instance of the class.

        Args:
            id (any): The unique identifier for the instance.
            data (any, optional): The optional data associated with the instance. Defaults to None.
            node_type (any, optional): The optional node type of the instance. Defaults to None.
            params (dict, optional): The optional parameters for the instance. Defaults to an empty dictionary.

        Returns:
            None

        Attributes:
            id (any): The unique identifier for the instance.
            data (any): The data associated with the instance.
            node_type (any): The node type of the instance.
            params (dict): The parameters for the instance.
            edges (list): The list of edges associated with the instance.
            artifacts (dict): The dictionary to store outputs/results.
            status (str): The status of the instance. Possible values: 'unprocessed', 'processing', 'processed'.
        """
        self.id = id
        self.data = data
        self.node_type = node_type
        self.params = params if params else {}
        self.edges = []
        self.artifacts = {}  # To store outputs/results
        self.status = 'unprocessed'  
        # Possible values: 'unprocessed', 'processing', 'processed'

    def add_edge(self, edge):
        self.edges.append(edge)

    def get_outgoing_edges(self):
        return [edge for edge in self.edges if edge.source == self]

    def get_incoming_edges(self):
        return [edge for edge in self.edges if edge.target == self]
