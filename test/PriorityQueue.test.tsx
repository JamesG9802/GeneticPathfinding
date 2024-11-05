import { HeapNode, PriorityQueue } from "@/algorithm/PriorityQueue"


describe("Priority Queue works when", () => {
    //  Size Test
    describe("Size works when", () => {
        it("handles the empty case", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            expect(pq.size() == 0).toBeTruthy();
        })
        it("handles some number of elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];

            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }

            pq.push(...elements);
            expect(pq.size() == 100).toBeTruthy();
        })
    })

    //  Empty Test
    describe("Is Empty works when", () => {
        it("handles the empty case", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            expect(pq.is_empty()).toBeTruthy();
        })
        it("handles some number of elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];

            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }

            pq.push(...elements);
            expect(!pq.is_empty()).toBeTruthy();
        })
    })

    //  Peek Test
    describe("Peeks works when", () => {
        it("handles the empty case", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            expect(pq.peek() == undefined).toBeTruthy();
        })
        it("handles some number of elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];

            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }

            pq.push(...elements);

            expect(pq.peek().element == 99).toBeTruthy();
        })
    })

    //  Push Test
    describe("Push works when", () => {
        it("handles normal elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];
            
            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }
            
            pq.push(...elements);
            
            expect(pq.size() == 100).toBeTruthy();
        })
        it("handles duplicate elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];

            for(let i = 0; i < 100; i++) {
                elements.push({element: 0, priority: 0});
            }

            pq.push(...elements);

            expect(pq.size() == 100).toBeTruthy();
        })
    })

    //  Pop Test
    describe("Pop works when", () => {
        it("handles enough elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];
            
            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }
            
            pq.push(...elements);
            
            expect(pq.size() == 100).toBeTruthy();
            expect(pq.pop().element = 99).toBeTruthy();
            expect(pq.size() == 99).toBeTruthy();
        })
        it("handles not enough elements", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            
            expect(pq.size() == 0).toBeTruthy();
            expect(pq.pop() == undefined).toBeTruthy();
            expect(pq.size() == 0).toBeTruthy();
        })
        it("handles removing highest priority first", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: HeapNode<number, number>[] = [];
            
            for(let i = 0; i < 100; i++) {
                elements.push({element: i, priority: i});
            }
            
            pq.push(...elements);
            
            for(let i = 99; i >= 0; i--) {
                expect(pq.pop().element == i).toBeTruthy();
            }
        })
        it("handles sorting positive values", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue();
            let elements: number[] = [];
            
            for(let i = 0; i < 100; i++) {
                let value = Math.random() * 500;
                elements.push(value);
                pq.push({element: value, priority: value});
            }
            
            elements.sort((a: number, b: number) => a - b);

            for(let i = 0; i < 100; i++) {
                expect(pq.pop().element == elements.pop()).toBeTruthy();
            }
        })
    })

    //  Min-Heap Test
    describe("Min-Heap works when", () => {
        it("handles positive priority", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
            let elements: number[] = [];
            
            for(let i = 0; i < 100; i++) {
                let value = Math.random() * 500;
                elements.push(value);
                pq.push({element: value, priority: value});
            }
            
            elements.sort((a: number, b: number) => a - b);

            for(let i = 0; i < 100; i++) {
                expect(pq.pop().element == elements[i]).toBeTruthy();
            }
        })
        it("handles negative priority", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
            let elements: number[] = [];
            
            for(let i = 0; i < 100; i++) {
                let value = Math.random() * -500;
                elements.push(value);
                pq.push({element: value, priority: value});
            }
            
            elements.sort((a: number, b: number) => a - b);
            
            for(let i = 0; i < 100; i++) {
                expect(pq.pop().element == elements[i]).toBeTruthy();
            }
        })
        it("handles positive and negative priority", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
            let elements: number[] = [];
            
            for(let i = 0; i < 100; i++) {
                let value = Math.random() * 500 - 250;
                elements.push(value);
                pq.push({element: value, priority: value});
            }
            
            elements.sort((a: number, b: number) => a - b);

            for(let i = 0; i < 100; i++) {
                expect(pq.pop().element == elements[i]).toBeTruthy();
            }
        })
    })
})