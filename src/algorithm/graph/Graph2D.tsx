import { UndirectedWeightedGraph } from "../PPGA";
import { ValueSet } from "../../utils/ValueSet";
import { GeneticGraph } from "../gene/GeneticGraph";
import { calculate_fitness, Chromosome } from "../gene/Chromosome";
import { ValueMap } from "@/utils/ValueMap";

/**
 * A node for a `Graph2D`.
 */
export type Node2D = {
    /**
     * The horizontal component.
     */
    x: number;

    /**
     * The vertical component.
     */
    y: number;
}

/**
 * Returns true if two nodes are equal
 * @param a - the first node
 * @param b - the second node
 * @returns whether the nodes are equal.
 */
export function Node2DEquals(a: Node2D, b: Node2D): boolean {
    return a.x == b.x && a.y == b.y;
}

export class Graph2D extends UndirectedWeightedGraph<Node2D> implements GeneticGraph<Node2D> {
    static readonly directions: Node2D[] = [
        {x: +1, y:  0},
        {x: -1, y:  0},
        {x:  0, y: +1},
        {x:  0, y: -1},
    ]

    /**
     * Width of the graph.
     */
    readonly width: number;

    /**
     * Height of the graph.
     */
    readonly height: number;

    readonly walls: ValueSet<Node2D>;

    /**
     * Creates a new graph representing a 2D grid.
     * @param width - the width of the graph.
     * @param height - the height of the graph.
     */
    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
        this.walls = new ValueSet<Node2D>(Node2DEquals);
    }

    /**
     * Returns the manhattan distance heuristic between two nodes
     * @param from - the starting node
     * @param to - the ending node
     * @returns the manhattan distance
     */
    manhattan_distance(from: Node2D, to: Node2D): number {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    }

    /**
     * Checks if a node is within the bounds of the graph.
     * @param node - the node to check
     * @returns True if the node is in bounds.
     */
    in_bounds(node: Node2D): boolean {
        return (
            node.x >= 0 && 
            node.x < this.width &&
            node.y >= 0 &&
            node.y < this.height
        )
    }

    /**
     * Checks if a node is able to be used as a path. This means that the node cannot be a wall.
     * @param node - the node to check
     * @returns True if the node is not a wall.
     */
    is_passable(node: Node2D): boolean {
        return !this.walls.has(node);
    }

    /**
     * Creates a list of neighbors for a given node.
     * @param node - the node to check.
     * @returns a list of neighbors.
     */
    neighbors(node: Node2D): Node2D[] {
        let neighbors: Node2D[] = [];
        for(let i = 0; i < Graph2D.directions.length; i++) {
            let possible_neighbor: Node2D = {
                x: node.x + Graph2D.directions[i].x, 
                y: node.y + Graph2D.directions[i].y 
            };
            if(this.in_bounds(possible_neighbor) && this.is_passable(possible_neighbor)) {
                neighbors.push(possible_neighbor);
            }
        }
        return neighbors;
    }


    /**
     * Returns the cost of travelling between nodes.
     * @param from - the source node
     * @param to - the target node
     * @returns the cost of travelling between the source node to the source node.
     */
    cost(_: Node2D, __: Node2D): number {
        return 1;
    }


    vector_distance: (chromosome: Chromosome, vector: number) => number =
    (chromosome: Chromosome, vector: number) => {
        //  Following https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf,
        //  the 1st and 3rd vectors are the vertical vectors
        //  the 2nd and 4th vectors are the horizontal vectors
        let multiplier: number = vector % 2 == 0 ? this.height : this.width;
        return Math.trunc(chromosome.distances[vector] * chromosome.directions[vector] * multiplier);
    }

    restrict_null: (chromsome: Chromosome) => boolean = 
    (chromosome: Chromosome) => {
        //  Following https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf,
        //  the 1st and 3rd vectors are the vertical vectors
        //  the 2nd and 4th vectors are the horizontal vectors
        let vertical: number = this.vector_distance(chromosome, 0) + this.vector_distance(chromosome, 2);
        let horizontal: number = this.vector_distance(chromosome, 1) + this.vector_distance(chromosome, 3);

        return vertical == 0 && horizontal == 0;
    }

    restrict_adjacent: (c: Chromosome, node: Node2D) => boolean 
    = (chromosome: Chromosome, node: Node2D) => {
        let blocked: Node2D[] = [];
        for(let i = 0; i < Graph2D.directions.length; i++) {
            let possible_neighbor: Node2D = {
                x: node.x + Graph2D.directions[i].x, 
                y: node.y + Graph2D.directions[i].y 
            };
            if(!this.in_bounds(possible_neighbor) || !this.is_passable(possible_neighbor)) {
                blocked.push(possible_neighbor);
            }
        }

        let v1 = this.vector_distance(chromosome, 0);
        let v2 = this.vector_distance(chromosome, 1);
        let v3 = this.vector_distance(chromosome, 2);
        let v4 = this.vector_distance(chromosome, 3);
        for(let i = 0; i < blocked.length; i++) {
            //  impossible to go up, so block if chromosome tries to go straight up
            if(blocked[i].y < node.y && (v1 > 0 || (v2 == 0 && v1 + v3 > 0))) {
                return true;
            }
            //  impossible to go right, so block if chromosome tries to go straight right
            if(blocked[i].x > node.x && (v1 == 0 && v2 > 0 || (v1 + v3 == 0 && v2 + v4 > 0))) {
                return true;
            }
            //  impossible to go down, so block if chromosome tries to go straight down
            if(blocked[i].y > node.y && (v1 < 0 || (v2 == 0 && v1 + v3 < 0))) {
                return true;
            }
            //  impossible to go left, so block if chromosome tries to go right
            if(blocked[i].x < node.x && (v1 == 0 && v2 < 0 || (v1 + v3 == 0 && v2 + v4 < 0))) {
                return true;
            }
        }
        return false;
    }

    evaluate_path: (
        chromosome: Chromosome, 
        node: Node2D, 
        goal_node: Node2D, 
        heuristic: (from: Node2D, to: Node2D) => number
    ) => [number, number, Node2D] =
    (chromosome: Chromosome, node: Node2D, goal_node: Node2D, heuristic: (from: Node2D, to: Node2D) => number) => {
        let vectors: number[] = [];
        for(let i = 0; i < 4; i++) {
            vectors.push(this.vector_distance(chromosome, i));
        }

        let path_node: Node2D = { x: node.x, y: node.y };
        let total_movement: number = 0;
        //  1st vector - vertical
        //  2nd vector - horizontal
        //  3rd vector - vertical
        //  4th vector - vertical
        for(let i = 0; i < 4; i++) {
            let magnitude: number = Math.abs(vectors[i]);
            
            //  Don't need to worry about the case when the vectors[i] is 0 because the loop won't run.
            let unit_vector: number = vectors[i] > 0 ? 1 : -1;

            let found_goal: boolean = false;
            if(i % 2 == 0) {
                //  Because the vertical vectors are encoded as -1 = down and +1 = up, the unit vector needs to be flipped.
                unit_vector *= -1;

                for(let i = 0; i < magnitude; i++) {
                    path_node.y += unit_vector;
                    total_movement += 1;
                    if(!this.is_passable(path_node) || !this.in_bounds(path_node))
                        return [-1, -1, {x: -1, y: -1}];

                    if(Node2DEquals(path_node, goal_node)) {
                        found_goal = true;
                        break;
                    }
                }
            }
            else {
                for(let i = 0; i < magnitude; i++) {
                    path_node.x += unit_vector;
                    total_movement += 1;
                    if(!this.is_passable(path_node) || !this.in_bounds(path_node))
                        return [-1, -1, {x: -1, y: -1}];
                    
                    if(Node2DEquals(path_node, goal_node)) {
                        found_goal = true;
                        break;
                    }
                }
            }
            if(found_goal) {
                break;
            }
        }
        let heuristic_distance: number = heuristic(path_node, goal_node);
        
        return [
            calculate_fitness(heuristic_distance, total_movement / 2, 3 * (this.width + this.height)),
            heuristic_distance,
            path_node
        ];
    }

    execute_path: (
        chromosome: Chromosome, 
        node: Node2D, 
        goal_node: Node2D,
        costs: ValueMap<Node2D, number>,
        connections: ValueMap<Node2D, Node2D>
    ) => Node2D = 
    (chromosome: Chromosome, node: Node2D, goal_node: Node2D, costs: ValueMap<Node2D, number>, connections: ValueMap<Node2D, Node2D>) => 
    {
        let vectors: number[] = [];
        for(let i = 0; i < 4; i++) {
            vectors.push(this.vector_distance(chromosome, i));
        }

        let path_node: Node2D = { x: node.x, y: node.y };

        //  1st vector - vertical
        //  2nd vector - horizontal
        //  3rd vector - vertical
        //  4th vector - vertical
        for(let i = 0; i < 4; i++) {
            let magnitude: number = Math.abs(vectors[i]);
            
            //  Don't need to worry about the case when the vectors[i] is 0 because the loop won't run.
            let unit_vector: number = vectors[i] > 0 ? 1 : -1;

            let found_goal: boolean = false;

            if(i % 2 == 0) {
                //  Because the vertical vectors are encoded as -1 = down and +1 = up, the unit vector needs to be flipped.
                unit_vector *= -1;

                for(let i = 0; i < magnitude; i++) {
                    let next_node = { x: path_node.x, y: path_node.y + unit_vector };

                    connections.set(next_node, path_node );
                    costs.set(next_node, costs.get(path_node)! + this.cost(next_node, path_node));

                    path_node = next_node;

                    if(!this.is_passable(path_node) || !this.in_bounds(path_node)) {
                        console.error(`Managed to find an impassable node when the path should have been verified. ${path_node}`);
                        return {x: -1, y: -1};
                    }

                    if(Node2DEquals(path_node, goal_node)) {
                        found_goal = true;
                        break;
                    }
                }
            }
            else {
                for(let i = 0; i < magnitude; i++) {
                    let next_node = { x: path_node.x + unit_vector, y: path_node.y};

                    connections.set(next_node, path_node);
                    costs.set(next_node, costs.get(path_node)! + this.cost(next_node, path_node));

                    path_node = next_node;

                    if(!this.is_passable(path_node) || !this.in_bounds(path_node)) {
                        console.error(`Managed to find an impassable node when the path should have been verified. ${path_node}`);
                        return {x: -1, y: -1};
                    }
                    
                    if(Node2DEquals(path_node, goal_node)) {
                        found_goal = true;
                        break;
                    }
                }
            }
            if(found_goal) {
                break;
            }
        }

        return path_node;
    }

}

