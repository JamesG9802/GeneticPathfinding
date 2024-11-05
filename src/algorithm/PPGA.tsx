import { PriorityQueue } from "./PriorityQueue";
import { ValueMap } from "./ValueMap";

/**
 * A graph with weighted, undirected connections between nodes.
 */
export abstract class UndirectedWeightedGraph<TNode> {
    /**
     * Creates a graph.
     */
    constructor() {
    }

    /**
     * Returns a list of neighbors for a node.
     * @param index - the index of the node.
     */
    abstract neighbors(node: TNode): TNode[];

    /**
     * Returns the cost of entering a node.
     * @param from - the index of the source node
     * @param to - the index of the target node
     */
    abstract cost(from: TNode, to: TNode): number;
}

/**
 * The algorithm is descrbed as (RTP-GA) in https://doi.org/10.1109/SBGAMES.2011.23 though 
 * some of the same authors describe the algorithm as PPGA in https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf.
 * @param graph - the graph to search on
 * @param starting_node - the starting position of the search
 * @param goal_node - the target position of the search 
 * @param heuristic - the distance heuristic 
 * @returns the nodes that make up the path, if any
 */
export function PPGA<TNode>(
    graph: UndirectedWeightedGraph<TNode>, 
    starting_node: TNode, 
    goal_node: TNode, 
    heuristic: (from: TNode, to: TNode) => number): ValueMap<TNode, TNode> 
{
    /**
     * The possible nodes that haven't been searched yet.
     */
    let possible_nodes: PriorityQueue<TNode, number> = new PriorityQueue(true);
    
    /**
     * A key-value pair means that the key was reached from the value. 
     */
    let connection_from: ValueMap<TNode, TNode> = new ValueMap<TNode, TNode>(); 
    
    /**
     * The total cost to reach a node.
     */
    let node_costs: ValueMap<TNode, number> = new ValueMap<TNode, number>();

    //  Start by adding the starting node to the possible nodes to search.
    possible_nodes.push({ element: starting_node, priority: 0} );
    connection_from.set(starting_node, starting_node);
    node_costs.set(starting_node, 0);

    while(!possible_nodes.is_empty()) {
        let node: TNode = possible_nodes.pop().element;
        if(node == goal_node) {
            break;
        }

        let neighbors: TNode[] = graph.neighbors(node);

        for(let i = 0; i < neighbors.length; i++) {
            let neighbor: TNode = neighbors[i];

            let new_cost: number = node_costs.get(node)! + graph.cost(node, neighbor);
            
            if(!node_costs.has(neighbor) || new_cost < node_costs.get(neighbor)!) {
                node_costs.set(neighbor, new_cost);
                let priority: number = new_cost + heuristic(neighbor, goal_node);
                possible_nodes.push({element: neighbor, priority: priority});
                connection_from.set(neighbor, node);
            }
        }
    }

    return connection_from;
}

export function rebuild_path<TNode>(
    connection_from: ValueMap<TNode, TNode>, 
    start_node: TNode,
    goal_node: TNode,
    node_equals: (a: TNode, b: TNode) => boolean
) 
{
    let node: TNode = goal_node;
    let path: TNode[] = [];

    //  Never reached the goal.
    if(!connection_from.has(goal_node)) {
        return path;
    }

    while(!node_equals(node, start_node)) {
        path.push(node);
        node = connection_from.get(node)!;
    }
    path.push(start_node);
    path.reverse();
    return path;
}