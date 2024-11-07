import { ValueMap } from "@/utils/ValueMap";
import { Chromosome } from "./Chromosome";


export interface GeneticGraph<TNode> {
    /**
     * Calculates the distance of a vector.
     * @param chromosome - the chromosome to be evaluated
     * @param vector - the number of the vector
     * @returns the distance
     */
    vector_distance:(chromosome: Chromosome, vector: number) => number;

    /**
     * Check if a chromosome does not move anywhere.
     * @param chromsome - the chromosome to be evaluated
     * @returns `true` if the chromosome should be removed
     */
    restrict_null: (chromsome: Chromosome) => boolean;

    /**
     * Check if a chromosome formed a path through an adjacent obstacle.
     * @param chromsome - the chromosome to be evaluated
     * @param node - the starting node
     * @returns `true` if the chromosome should be removed
     */
    restrict_adjacent: (chromsome: Chromosome, node: TNode) => boolean;

    /**
     * Evaluates the fitness of a chromosome's path. -1 is returned if the path is invalid.
     * @param chromosome - the chromosome to be evaluated
     * @param node - the starting node
     * @param goal_node - the target note
     * @param heuristic - the estimate for how close a node is to the goal
     * @returns [the fitness score, heuristic score, the end node of the path]
     */
    evaluate_path: (
        chromosome: Chromosome, 
        node: TNode, 
        goal_node: TNode, 
        heuristic: (from: TNode, to: TNode) => number
    ) => [number, number, TNode];

    /**
     * Explores a chromosome's path and add connections to the map.
     * @param chromosome - the individual
     * @param node - the node to begin the path
     * @param goal_node - the intended goal
     * @param heuristic - the estimate for how close a node is to the goal
     * @param costs - the map of costs to get to a node
     * @param connections - the map of connections
     * @returns the node where the path stops
     */
    execute_path: (
        chromosome: Chromosome,
        node: TNode,
        goal_node: TNode,
        costs: ValueMap<TNode, number>,
        connections: ValueMap<TNode, TNode>
    ) => TNode;
}