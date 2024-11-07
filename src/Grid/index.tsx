import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Graph2D, Node2D, Node2DEquals } from "../algorithm/graph/Graph2D";
import { ValueMap } from "../utils/ValueMap";
import { PPGA, rebuild_path } from "../algorithm/PPGA";

function grid_value_to_char(value: number): string {
    switch(value) {
        default: 
        case 0:
            return "-";
        case 1:
            return "X";
        case 2: 
            return "S";
        case 3:
            return "G";
        case 4:
            return "@";
        case 5:
            return "→";
        case 6:
            return "←";
        case 7:
            return "↓";
        case 8:
            return "↑";
        }
}

export function Grid() {
    const [grid, set_grid] = useState<number[]>([]);
    const [width, set_width] = useState<number>(7);
    const [height, set_height] = useState<number>(7);

    const [graph, set_graph] = useState<Graph2D>(new Graph2D(width, height));
    const [start_node, set_start_node] = useState<Node2D>({x: 0, y: 0});
    const [goal_node, set_goal_node] = useState<Node2D>({x: width - 1, y: height - 1});
    const [solver, set_solver] = useState<IterableIterator<[ValueMap<Node2D, Node2D>, Node2D]>>();
    const [solver_done, set_solver_done] = useState<boolean>(false);
    const [connections, set_connections] = useState<ValueMap<Node2D, Node2D>>(new ValueMap());

    const [explored_cell, set_explored_cell] = useState<number>();

    const [mode, set_mode] = useState<number>(0);
    
    useEffect(() => {
        let grid = [];
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                grid.push(0);
            }
        }

        let graph = new Graph2D(width, height);
        let solver = PPGA(graph, start_node, goal_node, Node2DEquals, 
            (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y));
        let connections = new ValueMap<Node2D, Node2D>();

        set_grid([...grid]);

        set_graph(graph);
        set_solver(solver);
        set_solver_done(false);
        set_connections(connections);
        set_goal_node({x: -1, y: -1});
        set_start_node({x: -1, y: -1});
        set_explored_cell(-1);
    }, [width, height]);

    function update_grid(connections: ValueMap<Node2D, Node2D>, path: Node2D[]) {
        for(let i = 0; i < path.length;i++) {
            let node = path[i];
            if(Node2DEquals(node, start_node) || Node2DEquals(node, goal_node))
                continue;
            grid[node.x + node.y * width] = 4;
        }
        let keys = connections.keys();

        for(let i = 0; i < keys.length; i++) {
            let exists = false;
            
            if(Node2DEquals(keys[i], start_node) || Node2DEquals(keys[i], goal_node))
                continue;

            for(let j = 0; j < path.length; j++) {
                if(Node2DEquals(path[j], keys[i])) {
                    exists = true;
                    break;
                }
            }
            if(!exists) {
                //  point to parent
                let parent = connections.get(keys[i])!
                let symbol = 0;
                if(parent.x > keys[i].x) {
                    symbol = 5;
                }
                else if (parent.x < keys[i].x) {
                    symbol = 6;
                }
                else if (parent.y > keys[i].y) {
                    symbol = 7;
                }
                else if (parent.y < keys[i].y) {
                    symbol = 8;
                }
                grid[keys[i].x + keys[i].y * width] = symbol;
            }
        }
        set_grid([...grid]);
    }

    function modify_grid(index: number, option?: number) {
        option = option == undefined ? mode : option;
        
        let node: Node2D = {x: index % width, y: Math.floor(index / width)};

        let new_grid = grid;
        let new_graph: Graph2D = graph;
        let new_start_node: Node2D = start_node;
        let new_goal_node: Node2D = goal_node;

        switch(option) {
            // erase
            case 0:
                new_grid[index] = option;

                //  Remove walls
                if(new_graph.walls.has(node)) {
                    new_graph.walls.delete(node);
                }
                //  Remove start node
                else if(Node2DEquals(new_start_node, node)) {
                    new_start_node = {x: -1, y: -1};
                }
                //  Remove goal node
                else if(Node2DEquals(new_goal_node, node)) {
                    new_goal_node = {x: -1, y: -1};
                }

                break;
            
            //  place wall
            case 1:
                new_grid[index] = option;
                new_graph.walls.add({x: index % width, y: Math.floor(index / width)});
                break;
            
            // set start node
            case 2:
                if(new_start_node.x + new_start_node.y * width >= 0)
                    new_grid[new_start_node.x + new_start_node.y * width] = 0;
                new_grid[index] = option;
                new_start_node = {x: index % width, y: Math.floor(index / width)};
                break;

            //  set goal node
            case 3:
                if(new_goal_node.x + new_goal_node.y * width >= 0)
                    new_grid[new_goal_node.x + new_goal_node.y * width] = 0;
                new_grid[index] = option;
                new_goal_node = {x: index % width, y: Math.floor(index / width)};
                break;
        }
        set_grid([...grid]);
        set_graph(graph);
        set_start_node(new_start_node);
        set_goal_node(new_goal_node);
        
        set_solver(PPGA(new_graph, new_start_node, new_goal_node, Node2DEquals, 
            (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y)));
        set_solver_done(false);
    }

    return (
        <>
            <button onClick={()=>{set_width(width + 1)}}>W+</button>
            <button disabled={width == 1 } onClick={()=>{set_width(Math.max(width - 1, 1))}}>W-</button>
            <button onClick={()=>{set_height(height + 1)}}>H+</button>
            <button disabled={height == 1 } onClick={()=>{set_height(Math.max(height - 1, 1))}}>H-</button>
            
            <button onClick={() =>{set_mode(-1)}}>No Select</button>
            <button onClick={() =>{set_mode(0)}}>Erase</button>
            <button onClick={() =>{set_mode(1)}}>Wall</button>
            <button onClick={() =>{set_mode(2)}}>Start</button>
            <button onClick={() =>{set_mode(3)}}>Goal</button>
            <button onClick={() =>{
                if(!solver_done && solver != undefined) {
                    let next = solver.next();

                    let [new_connections, explored_node]: [ValueMap<Node2D, Node2D>, Node2D | undefined] = next.value;
                    
                    set_connections(new_connections);
                    set_solver_done(next.done!);
                    set_explored_cell(explored_node != undefined ? explored_node.x + explored_node.y * width : -1);
                    update_grid(new_connections, []);
                    
                }
                else if(solver_done) {
                    console.log("?")
                    let path: Node2D[] = rebuild_path(connections, start_node, goal_node, Node2DEquals);
                    update_grid(connections, path);
                    set_explored_cell(-1);
                }
            }}>Pathfind</button>
            <div className="Grid" style={{
                gridTemplateColumns: `repeat(${width}, 0fr)`
            }}>
                {
                    grid.map((value, index) => {
                        return <span 
                            onClick={() => modify_grid(index)} 
                            key={index} 
                            className={`Grid-Cell ${
                                value == 0 ? "Grid-Empty" :
                                value == 1 ? "Grid-Wall" :
                                value == 2 ? "Grid-Start" :
                                value == 3 ? "Grid-Goal" :
                                value == 4 ? "Grid-Path" :
                                value >= 5 && value <= 8 ? "Grid-Explored" : 
                                ""
                            } ${
                                index == explored_cell ? "Grid-New" :
                                ""
                            }`}
                            style={{
                                cursor: mode != -1 ? "pointer" : "default"
                            }}
                        >
                            {grid_value_to_char(value)}
                        </span>
                    })
                }
            </div>
        </>
    );
}