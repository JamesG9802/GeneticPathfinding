import { UndirectedWeightedGraph } from "./PPGA";
import { ValueSet } from "./ValueSet";

/**
 * A node for a `Graph2D`.
 */
export type Node2D = {
    /**
     * The horizontal component.
     */
    readonly x: number;

    /**
     * The vertical component.
     */
    readonly y: number;
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

export class Graph2D extends UndirectedWeightedGraph<Node2D> {
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
}