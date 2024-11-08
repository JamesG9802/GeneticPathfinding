import { HeapNode, PriorityQueue } from "@/utils/PriorityQueue"


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

    //  Clear Test
    describe("Clear when", () => {
        it("handles occupied heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
            
            for(let i = 0; i < 100; i++) {
                let value = Math.random() * 500;
                pq.push({element: value, priority: value});
            }
            
            pq.clear();
            expect(pq.is_empty()).toBeTruthy();
        })
        it("handles empty heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
            pq.clear();
            expect(pq.is_empty()).toBeTruthy();
        })
    })
    
    // Remove Test
    describe("Remove when", () => {
        it("handles removing an element from an occupied heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
    
            // Populate the heap with known elements
            pq.push({ element: 10, priority: 10 });
            pq.push({ element: 20, priority: 20 });
            pq.push({ element: 15, priority: 15 });
            pq.push({ element: 1, priority:  3 });
            pq.push({ element: 2, priority: 300 });
    
            // Remove an element and verify it no longer exists
            expect(pq.remove(15)).toBeTruthy();
            expect(pq.has(15)).toBeFalsy();
            expect(pq.size() == 4).toBeTruthy();
        });

        it("handles removing the last element from an occupied heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
    
            // Populate the heap with known elements
            pq.push({ element: 10, priority: 10 });
            pq.push({ element: 20, priority: 20 });
            pq.push({ element: 15, priority: 15 });
    
            // Remove an element and verify it no longer exists
            expect(pq.remove(15)).toBeTruthy();
            expect(pq.has(15)).toBeFalsy();
            expect(pq.size() == 2).toBeTruthy();
        });
    
        it("handles attempting to remove a non-existing element", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
    
            // Populate the heap with known elements
            pq.push({ element: 10, priority: 10 });
            pq.push({ element: 20, priority: 20 });
            pq.push({ element: 15, priority: 15 });
    
            // Attempt to remove a non-existing element and verify the heap is unchanged
            expect(pq.remove(30)).toBeFalsy();
            expect(pq.size() == 3).toBeTruthy();  // Size should remain unchanged
            expect(pq.has(10)).toBeTruthy();
            expect(pq.has(20)).toBeTruthy();
            expect(pq.has(15)).toBeTruthy();
        });
    
        it("handles removing the only element in the heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
    
            // Add a single element to the heap
            pq.push({ element: 10, priority: 10 });
    
            // Remove the only element and verify the heap is empty
            expect(pq.remove(10)).toBeTruthy();
            expect(pq.is_empty()).toBeTruthy();
        });
    
        it("handles attempting to remove from an empty heap", () => {
            let pq: PriorityQueue<number, number> = new PriorityQueue(true);
    
            // Attempt to remove from an empty heap
            expect(pq.remove(10)).toBeFalsy();
            expect(pq.is_empty()).toBeTruthy();  // Heap should remain empty
        });
    });
    
})