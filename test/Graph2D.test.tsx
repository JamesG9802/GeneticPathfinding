import { Chromosome } from "@/algorithm/gene/Chromosome";
import { Graph2D, Node2D, Node2DEquals } from "@/algorithm/graph/Graph2D";
import { PriorityQueue } from "@/utils/PriorityQueue";
import { ValueMap } from "@/utils/ValueMap";

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

    //  Vector Distance test
    describe("Vector Distance works when", () => {
        it("chromosome has positive values and direction", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3], 
                directions: [1] 
            };

            let distance: number = graph.vector_distance(chromosome, 0);

            //  9 * .3 = 2.7 => 2
            expect(distance == 2).toBeTruthy();
        })
        it("chromosome has positive values and negative direction", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3], 
                directions: [-1] 
            };

            let distance: number = graph.vector_distance(chromosome, 0);

            //  9 * .3 = 2.7 => -2
            expect(distance == -2).toBeTruthy();
        })
        it("chromosome has positive values and 0 direction", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3], 
                directions: [0] 
            };

            let distance: number = graph.vector_distance(chromosome, 0);

            //  9 * .3 = 2.7 => 0
            expect(distance == 0).toBeTruthy();
        })
    })

    //  Restrict null test
    describe("Restrict Null works when", () => {
        it("chromosome has non-null direction", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3, .5, .6, .7], 
                directions: [1, 0, 0, 0] 
            };

            expect(graph.restrict_null(chromosome)).toBeFalsy();
        })
        it("chromosome has null direction", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3, .5, .6, .7], 
                directions: [0, 0, 0, 0] 
            };

            expect(graph.restrict_null(chromosome)).toBeTruthy();
        })
        it("chromosome has opposing direction that don't sum to 0", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3,0,.6,0], 
                directions: [1,0,-1,0] 
            };

            expect(graph.restrict_null(chromosome)).toBeFalsy();
        })
        
        it("chromosome has opposing direction that sum to 0", () => {
            let graph: Graph2D = new Graph2D(9, 9);

            let chromosome: Chromosome = { 
                distances: [.3,0,.3,0], 
                directions: [1,0,-1,0] 
            };

            expect(graph.restrict_null(chromosome)).toBeTruthy();
        })
    }) 

    //  Restrict null test
    describe("Restrict Adjacent works when", () => {
        it("chromosome doesn't go into wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 2, y: 1});

            let chromosome: Chromosome = { 
                distances: [.3, 0, 0, 0], 
                directions: [-1, 0, 0, 0] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeFalsy();
        })
        it("chromosome goes straight into wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 2, y: 3});

            let chromosome: Chromosome = { 
                distances: [.3, 0, 0, 0], 
                directions: [-1, 0, 0, 0] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
        it("chromosome swerves wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 1, y: 2});

            let chromosome: Chromosome = { 
                distances: [.3, .5, 0, 0], 
                directions: [1, -1, 0, 0] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeFalsy();
        })
        it("chromosome moves back and forth into wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 3, y: 2});

            let chromosome: Chromosome = { 
                distances: [0, .2, 0, 1], 
                directions: [0, -1, 0, 1] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
        it("chromosome goes into up wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 2, y: 1});

            let chromosome: Chromosome = { 
                distances: [0, 0, 1, 0], 
                directions: [0, 0, 1, 0] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
        it("chromosome goes into left wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 1, y: 2});

            let chromosome: Chromosome = { 
                distances: [0, 0, 0, 1], 
                directions: [0, 0, 0, -1] 
            };

            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
        
        it("chromosome goes into down wall first vector", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 2, y: 3});

            let chromosome: Chromosome = { 
                distances: [1, 0, 0, 0], 
                directions: [-1, 0, 0, 0] 
            };
            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
        it("chromosome goes into down wall third vector", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            graph.walls.add({x: 2, y: 3});

            let chromosome: Chromosome = { 
                distances: [.2, 0, 1, 0], 
                directions: [1, 0, -1, 0] 
            };
            expect(graph.restrict_adjacent(chromosome, {x: 2, y: 2})).toBeTruthy();
        })
    }) 

    //  Evaluate path test
    describe("Evaluate Path works when", () => {
        it("chromosome has two movement vectors", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let heuristic = (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            
            let start_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // - - W - -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [0, .2, .4, 0], 
                directions: [0, 1, 1, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - V - - -
            // - V W - -
            // S H W - G
            // - - W - -
            // - - - - -
            //  The H represents 1 move right.
            //  The two V's represents 2 moves up.

            //  The board then looks like this when finished
            // - S - - -
            // - - W - -
            // - - W - G
            // - - W - -
            // - - - - -

            //  The fitness formula is FA = ROOF - HEURISTIC - TOTAL_MOVEMENT * 0.1;
            //  In this case, the heuristic is manhattan distance.
            //  The total movement is half the the total nodes travelled.
            //  HEURISTIC = 5
            //  TOTAL_MOVEMENT = 1.5
            //  ROOF = 3 * (width + height) = 30
            //  Expected fitness = 30 - 5 - 1.5 * 0.1 = 24.85
            let fitness = graph.evaluate_path(chromosome, start_node, goal_node, heuristic);
            expect(Math.abs(fitness[0] - 24.85) < 1e-6).toBeTruthy();
            expect(fitness[1] == 5).toBeTruthy();
        })
        it("chromosome has tnree movement vectors", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let heuristic = (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            
            let start_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // - - W - -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [.4, .8, .4, 0], 
                directions: [-1, 1, 1, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - V
            // V - W - V
            // V H H H H

            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - - W - S
            // - - W - -
            // - - - - -

            //  The fitness formula is FA = ROOF - HEURISTIC - TOTAL_MOVEMENT * 0.1;
            //  In this case, the heuristic is manhattan distance.
            //  The total movement is half the the total nodes travelled.
            //  HEURISTIC = 0
            //  TOTAL_MOVEMENT = 8
            //  ROOF = 3 * (width + height) = 30
            //  Expected fitness = 30 - 0 - 4 * 0.1 = 29.6
            let fitness = graph.evaluate_path(chromosome, start_node, goal_node, heuristic);
            expect(Math.abs(fitness[0] - 29.6) < 1e-6).toBeTruthy();
            expect(fitness[1] == 0).toBeTruthy();
        })
        it("chromosome has four movement vectors", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let heuristic = (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            
            let start_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // - - W - -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [.4, .6, .4, .2], 
                directions: [-1, 1, 1, 1] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W V H
            // V - W V -
            // V H H H -

            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - - W - S
            // - - W - -
            // - - - - -

            //  The fitness formula is FA = ROOF - HEURISTIC - TOTAL_MOVEMENT * 0.1;
            //  In this case, the heuristic is manhattan distance.
            //  The total movement is half the the total nodes travelled.
            //  HEURISTIC = 0
            //  TOTAL_MOVEMENT = 8
            //  ROOF = 3 * (width + height) = 30
            //  Expected fitness = 30 - 0 - 4 * 0.1 = 29.6
            let fitness = graph.evaluate_path(chromosome, start_node, goal_node, heuristic);
            expect(Math.abs(fitness[0] - 29.6) < 1e-6).toBeTruthy();
            expect(fitness[1] == 0).toBeTruthy();
        })
        it("chromosome collides into wall", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let heuristic = (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            
            let start_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // - - W - -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [0, .6, 0, 0], 
                directions: [0, 1, 0, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S H H H G
            // - - W - -
            // - - - - -

            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - S W - G
            // - - W - -
            // - - - - -

            //  The fitness formula is FA = ROOF - HEURISTIC - TOTAL_MOVEMENT * 0.1;
            //  In this case, the heuristic is manhattan distance.
            //  The total movement is half the the total nodes travelled.
            //  HEURISTIC = 3
            //  TOTAL_MOVEMENT = 1
            //  ROOF = 3 * (width + height) = 30
            //  Expected fitness = 30 - 3 - 0.5 * 0.1 = 29.6
            let fitness = graph.evaluate_path(chromosome, start_node, goal_node, heuristic);
            expect(fitness[0] == 26.95).toBeTruthy();
            expect(fitness[1] == 3).toBeTruthy();
            expect(Node2DEquals(fitness[2], {x: 1, y: 2})).toBeTruthy();
        })
        it("chromosome goes out of bounds", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let heuristic = (from: Node2D, to: Node2D) => Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            
            let start_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // - - W - -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [.6, 0, 0, 0], 
                directions: [-1, 0, 0, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - G
            // V - W - -
            // V - - - -
            // V



            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - - W - G
            // - - W - -
            // S - - - -

            //  The fitness formula is FA = ROOF - HEURISTIC - TOTAL_MOVEMENT * 0.1;
            //  In this case, the heuristic is manhattan distance.
            //  The total movement is half the the total nodes travelled.
            //  HEURISTIC = 6
            //  TOTAL_MOVEMENT = 2
            //  ROOF = 3 * (width + height) = 30
            //  Expected fitness = 30 - 6 - 1 * 0.1 = 29.6

            let fitness = graph.evaluate_path(chromosome, start_node, goal_node, heuristic);
            expect(fitness[0] == 23.9).toBeTruthy();
            expect(fitness[1] == 6).toBeTruthy();
            expect(Node2DEquals(fitness[2], {x: 0, y: 4})).toBeTruthy();
        })
    }) 
    //  Evaluate path test
    describe("Evaluate Path works when", () => {
        it("chromosome has two movement vectors", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let from: Node2D = { x: 4, y: 2};
            let to: Node2D = {x: 0, y: 4};
            
            expect(graph.manhattan_distance(from, to) == 6).toBeTruthy();
        })
    }) 

    describe("Execute Path works when", () => {
        it("explores path when it overlaps goal", () => {
            let graph: Graph2D = new Graph2D(5, 5);

            let current_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 3, y: 4};

            let possible_nodes: PriorityQueue<Node2D, number> = new PriorityQueue();
            let connections: ValueMap<Node2D, Node2D> = new ValueMap();
                connections.set({x: 0, y: 0}, {x: 0, y: 0});
                connections.set({x: 0, y: 1}, {x: 0, y: 0});
                connections.set({x: 0, y: 2}, {x: 0, y: 1});

            let costs: ValueMap<Node2D, number> = new ValueMap();
                costs.set({x: 0, y: 0}, 0);

            let keys = connections.keys();
            for(let i = 1; i < keys.length; i++) {
                costs.set(keys[i], 
                    costs.get(connections.get(keys[i])!)! + 
                    graph.cost(keys[i], connections.get(keys[i])!)
                );
            }

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            //  The algorithm explored (0, 0), (0, 1), and (0, 2)
            // S - - - -
            // ↑ - W - -
            // C - W - -
            // - - W - -
            // - - - G -

            let chromosome: Chromosome = { 
                distances: [.4, .6, .2, 0], 
                directions: [-1, 1, 1, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - -
            // V - W V -
            // V H H H -

            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - - W - -
            // - - W - -
            // - - - S -

            
            expect(costs.size() == 3).toBeTruthy();
            expect(connections.size() == 3).toBeTruthy();

            let end_node = graph.execute_path(chromosome, current_node, goal_node, graph.manhattan_distance, possible_nodes, costs, connections);

            expect(Node2DEquals(end_node, goal_node));
            expect(costs.size() == 11).toBeTruthy();
            expect(connections.size() == 11).toBeTruthy();
        })

        it("explores path to graph", () => {
            let graph: Graph2D = new Graph2D(5, 5);

            let current_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 3, y: 3};

            let possible_nodes: PriorityQueue<Node2D, number> = new PriorityQueue();
            let connections: ValueMap<Node2D, Node2D> = new ValueMap();
                connections.set({x: 0, y: 0}, {x: 0, y: 0});
                connections.set({x: 0, y: 1}, {x: 0, y: 0});
                connections.set({x: 0, y: 2}, {x: 0, y: 1});

            let costs: ValueMap<Node2D, number> = new ValueMap();
                costs.set({x: 0, y: 0}, 0);

            let keys = connections.keys();
            for(let i = 1; i < keys.length; i++) {
                costs.set(keys[i], 
                    costs.get(connections.get(keys[i])!)! + 
                    graph.cost(keys[i], connections.get(keys[i])!)
                );
            }

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            //  The graph is expected to look like this:
            //  The algorithm explored (0, 0), (0, 1), and (0, 2)
            // S - - - -
            // ↑ - W - -
            // C - W - -
            // - - W G -
            // - - - - -

            let chromosome: Chromosome = { 
                distances: [.4, .6, .2, 0], 
                directions: [-1, 1, 1, 0] 
            };

            //  The path generated by the chromosome is expected to look like this:
            // - - - - -
            // - - W - -
            // S - W - -
            // V - W G -
            // V H H H -

            //  The board then looks like this when finished
            // - - - - -
            // - - W - -
            // - - W - -
            // - - W S -
            // - - - - -

            
            expect(costs.size() == 3).toBeTruthy();
            expect(connections.size() == 3).toBeTruthy();

            let end_node = graph.execute_path(chromosome, current_node, goal_node, graph.manhattan_distance, possible_nodes, costs, connections);

            expect(Node2DEquals(end_node, goal_node));
            expect(costs.size() == 13).toBeTruthy();
            expect(connections.size() == 13).toBeTruthy();
        })
        
        it("adapts path 1", () => {
            let graph: Graph2D = new Graph2D(5, 5);

            let current_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            let possible_nodes: PriorityQueue<Node2D, number> = new PriorityQueue();
            let connections: ValueMap<Node2D, Node2D> = new ValueMap();
            let costs: ValueMap<Node2D, number> = new ValueMap();

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            let chromosome: Chromosome = { 
                distances: [1, 1, 1, 1], 
                directions: [1, 1, 1, -1] 
            };

            let end_node = graph.execute_path(chromosome, current_node, goal_node, graph.manhattan_distance, possible_nodes, costs, connections);
            expect(Node2DEquals(end_node, {x: 0, y: 0})).toBeTruthy();
        })
        it("adapts path 2", () => {
            let graph: Graph2D = new Graph2D(5, 5);

            let possible_nodes: PriorityQueue<Node2D, number> = new PriorityQueue();
            let current_node: Node2D = {x: 0, y: 2};
            let goal_node: Node2D = {x: 4, y: 2};

            let connections: ValueMap<Node2D, Node2D> = new ValueMap();
            let costs: ValueMap<Node2D, number> = new ValueMap();

            graph.walls.add({x: 2, y: 1});
            graph.walls.add({x: 2, y: 2});
            graph.walls.add({x: 2, y: 3});

            let chromosome: Chromosome = { 
                distances: [0, 1, 1, 1], 
                directions: [0, 1, 1, 1] 
            };

            let end_node = graph.execute_path(chromosome, current_node, goal_node, graph.manhattan_distance, possible_nodes, costs, connections);

            expect(Node2DEquals(end_node, {x: 4, y: 0})).toBeTruthy();
        })
    })

    //  Cost test
    describe("Cost works when", () => {
        it("returns 1", () => {
            let graph: Graph2D = new Graph2D(5, 5);
            let from: Node2D = { x: 4, y: 3};
            let to: Node2D = {x: 4, y: 4};
            expect(graph.cost(from, to) == 1).toBeTruthy();
        })
    })
})