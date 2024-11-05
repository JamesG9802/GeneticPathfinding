import { Graph2D, Node2D, Node2DEquals } from "@/algorithm/Graph2D"

describe("Graph2D works when", () => {
    
    //  In bounds test
    describe("in bounds works when", () => {
        it("fails when node is (0,0) and board is 0x0", () => {
            let graph: Graph2D = new Graph2D(0, 0);

            expect(graph.in_bounds({x: 0, y: 0})).toBeFalsy();
        })
        it("works when node is (0,0) and board is 1x1", () => {
            let graph: Graph2D = new Graph2D(1, 1);

            expect(graph.in_bounds({x: 0, y: 0})).toBeTruthy();
        })
        it("fails when node is (-1, 0) and board is 4x6", () => {
            let graph: Graph2D = new Graph2D(4, 6);

            expect(graph.in_bounds({x: -1, y: 0})).toBeFalsy();
        })
        it("fails when node is (0, -1) and board is 4x6", () => {
            let graph: Graph2D = new Graph2D(4, 6);

            expect(graph.in_bounds({x: 0, y: -1})).toBeFalsy();
        })
        it("fails when node is (4, 0) and board is 4x6", () => {
            let graph: Graph2D = new Graph2D(4, 6);

            expect(graph.in_bounds({x: 4, y: 0})).toBeFalsy();
        })
        it("fails when node is (0, 6) and board is 4x6", () => {
            let graph: Graph2D = new Graph2D(4, 6);

            expect(graph.in_bounds({x: 0, y: 6})).toBeFalsy();
        })
    })

    //  Is passable test
    describe("is passable works when", () => {
        it("fails when node is a wall", () => {
            let graph: Graph2D = new Graph2D(3, 3);
            graph.walls.add({x: 1, y: 1});
            expect(graph.is_passable({x: 1, y: 1})).toBeFalsy();
        })
        it("works when node is not a wall", () => {
            let graph: Graph2D = new Graph2D(3, 3);

            expect(graph.is_passable({x: 1, y: 1})).toBeTruthy();
        })
    })

    //  Neighbors test
    describe("neighbors works when", () => {
        it("node is surrounded by empty space", () => {
            let graph: Graph2D = new Graph2D(3, 3);

            let expected_neighbors: Node2D[] = [
                {x: 1, y: 0},
                {x: 2, y: 1},
                {x: 1, y: 2},
                {x: 0, y: 1},
            ]

            let neighbors: Node2D[] = graph.neighbors({x: 1, y: 1});
            expect(neighbors.length == expected_neighbors.length).toBeTruthy();
            
            for(let i = 0; i < neighbors.length; i++) {
                let found_match: boolean = false;
                for(let j = 0; j < neighbors.length; j++) {
                    if(Node2DEquals(neighbors[i], expected_neighbors[j])) {
                        found_match = true;
                        break;
                    }
                }
                expect(found_match).toBeTruthy();
            }
        })
        it("node is surrounded by an edge", () => {
            let graph: Graph2D = new Graph2D(3, 3);

            let expected_neighbors: Node2D[] = [
                {x: 1, y: 0},
                {x: 0, y: 1},
            ]

            let neighbors: Node2D[] = graph.neighbors({x: 0, y: 0});
            
            expect(neighbors.length == expected_neighbors.length).toBeTruthy();
            
            for(let i = 0; i < neighbors.length; i++) {
                let found_match: boolean = false;
                for(let j = 0; j < neighbors.length; j++) {
                    if(Node2DEquals(neighbors[i], expected_neighbors[j])) {
                        found_match = true;
                        break;
                    }
                }
                expect(found_match).toBeTruthy();
            }
        })
        it("node is surrounded by a wall", () => {
            let graph: Graph2D = new Graph2D(3, 3);
            graph.walls.add({x: 1, y: 0});

            let expected_neighbors: Node2D[] = [
                {x: 2, y: 1},
                {x: 1, y: 2},
                {x: 0, y: 1},
            ]

            let neighbors: Node2D[] = graph.neighbors({x: 1, y: 1});
            
            expect(neighbors.length == expected_neighbors.length).toBeTruthy();
            
            for(let i = 0; i < neighbors.length; i++) {
                let found_match: boolean = false;
                for(let j = 0; j < neighbors.length; j++) {
                    if(Node2DEquals(neighbors[i], expected_neighbors[j])) {
                        found_match = true;
                        break;
                    }
                }
                expect(found_match).toBeTruthy();
            }
        })
    })
})