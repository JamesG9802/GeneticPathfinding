import { ValueMap } from "@/utils/ValueMap";
import { Chromosome } from "../gene/Chromosome";
import { GeneticGraph } from "../gene/GeneticGraph";

/**
 * A graph with weighted, undirected connections between nodes.
 */
export abstract class UndirectedWeightedGraph<TNode> implements GeneticGraph<TNode> {
    abstract vector_distance: (chromosome: Chromosome, vector: number) => number;
    abstract restrict_null: (chromsome: Chromosome) => boolean;
    abstract restrict_adjacent: (chromsome: Chromosome, node: TNode) => boolean;
    abstract evaluate_path: (chromosome: Chromosome, node: TNode, goal_node: TNode, 
        heuristic: (from: TNode, to: TNode) => number) => [number, number, TNode];
    abstract execute_path: (chromosome: Chromosome, node: TNode, goal_node: TNode, 
        costs: ValueMap<TNode, number>, connections: ValueMap<TNode, TNode>) => TNode;    
    
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