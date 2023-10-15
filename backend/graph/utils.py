import json
from node.base import Node
from edge.base import Edge
from graph.base import Graph
import matplotlib.pyplot as plt
import networkx as nx
import time
from nodeLibrary.SelectorNode import SelectorNode
from nodeLibrary.ImageUpload import ImageUpload


def visualize_graph(graph: Graph):
    # Create a new networkx graph
    G = nx.DiGraph()

    # Add nodes to the networkx graph
    for node in graph.nodes.values():
        label = f"ID: {node.id}\nType: {node.node_type}\nParams: {node.params}"
        G.add_node(node.id, label=label)

    # Add edges to the networkx graph
    for edge in graph.edges:
        G.add_edge(edge.source.id, edge.target.id)

    # Draw the graph
    pos = nx.spring_layout(G)  # Layout for our nodes/edges
    labels = nx.get_node_attributes(G, "label")  # Fetch the labels for the nodes
    nx.draw(G, pos, with_labels=False, node_size=3000, node_color="skyblue")
    nx.draw_networkx_labels(
        G, pos, labels, font_size=8, font_color="black", verticalalignment="center"
    )

    # Save the graph to a file
    filename = f"{int(time.time())}.png"
    plt.savefig(filename, format="PNG")
    print(f"Graph saved as {filename}")


def create_graph_from_reactflow_dict(data: dict) -> Graph:
    node_class_mapping = {
        "selector": SelectorNode,
        "imageUpload": ImageUpload,
    }
    # Create a new Graph object
    #
    graph = Graph()

    # Add nodes to the graph
    for node_data in data["nodes"]:
        node_id = node_data["id"]
        node_type = node_data["type"]
        node_params = node_data.get("data", {})
        # Use the mapping to get the appropriate node class, default to generic Node
        NodeClass = node_class_mapping.get(node_type, Node)
        node = NodeClass(id=node_id, node_type=NodeClass.__name__, params=node_params)
        graph.add_node(node)
        # print(graph)

    # Add edges to the graph
    for edge_data in data["edges"]:
        source_id = edge_data["source"]
        target_id = edge_data["target"]
        edge = Edge(source=graph.nodes[source_id], target=graph.nodes[target_id])
        graph.add_edge(source_id, target_id)

    print(graph)
    return graph
