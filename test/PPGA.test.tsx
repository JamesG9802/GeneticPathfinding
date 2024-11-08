import { Graph2D, Node2D, Node2DEquals } from "@/algorithm/graph/Graph2D";
import { PPGA, rebuild_path } from "@/algorithm/PPGA";
import { ValueMap } from "@/utils/ValueMap";

describe("PPGA works when", () => {
    it("it doesn't crash 🥴", () => {

        //  Suppress log
        jest.spyOn(console, "log").mockImplementation(() => {});

        let graph: Graph2D = new Graph2D(5, 5);
        graph.walls.add({x: 2, y: 1});
        graph.walls.add({x: 2, y: 2});
        graph.walls.add({x: 2, y: 3});
        let start_node: Node2D = { x: 0, y: 0};
        let goal_node: Node2D = { x: 4, y: 4};

        for(let i = 0; i < 1000; i++) {
            let solver: IterableIterator<[ValueMap<Node2D, Node2D>, Node2D]> = 
                PPGA<Node2D>(graph, start_node, goal_node, Node2DEquals, graph.manhattan_distance);
            let connections: ValueMap<Node2D, Node2D>;
            
            let next = solver.next();
            while(true) {
                if(next.done) {
                    connections = next.value[0];
                    break;
                }
                next = solver.next();
            }

            let path: Node2D[] = rebuild_path<Node2D>(connections, start_node, goal_node, Node2DEquals);
        
            expect(path.length != 0).toBeTruthy();
        }
    })
})