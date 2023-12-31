from node.base import Node
from edge.base import Edge

class Graph:
    def __init__(self):

        self.nodes = {}
        self.edges = []

    def add_node(self, node):
        self.nodes[node.id] = node

    def add_edge(self, source_id, target_id):
        if source_id in self.nodes and target_id in self.nodes:
            source = self.nodes[source_id]
            target = self.nodes[target_id]
            edge = Edge(source, target)
            self.edges.append(edge)
            source.add_edge(edge)
            target.add_edge(edge)

    def topological_sort(self):
        # States: 0 = unvisited, 1 = visiting, 2 = visited
        state = {node: 0 for node in self.nodes.values()}
        visited_nodes = []

        def dfs(node):
            if state[node] == 1:
                raise ValueError(
                    "Graph contains a cycle, cannot perform topological sort"
                )
            if state[node] == 0:
                state[node] = 1
                for edge in node.get_outgoing_edges():
                    dfs(edge.target)
                state[node] = 2
                visited_nodes.append(node)

        for node in self.nodes.values():
            if state[node] == 0:
                dfs(node)

        # Reverse the visited nodes so that they are in
        # the correct processing order
        return visited_nodes[::-1]

    def execute(self):
        topo_order = self.topological_sort()
        data = {}
        for node in topo_order:
            print(f"Processing {node}")
            outputs = node.process(data)
            data.update(outputs)
            print(f"Data is {data}")
            # Need to ensure there is output nodes and return it
        return data.get("result", "")

    def __repr__(self):
        nodes_repr = "\n".join(repr(node) for node in self.nodes.values())
        edges_repr = "\n".join(repr(edge) for edge in self.edges)
        return f"Graph Nodes:\n{nodes_repr}\n\nGraph Edges:\n{edges_repr}"
