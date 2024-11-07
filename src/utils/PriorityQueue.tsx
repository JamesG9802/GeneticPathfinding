/**
 * An node in the heap.
 */
export type HeapNode<TElement, TPriority> = {
    /**
     * The actual element.
     */
    element: TElement;

    /**
     * The priority of the element.
     */
    priority: TPriority;
}

/**
 * PriorityQueue implementation.
 * Modified from https://stackoverflow.com/a/42919752.
 */
export class PriorityQueue<TElement, TPriority> {

    /**
     * True if the priority queue uses a min-heap instead of a max-heap.
     */
    is_min: boolean;

    /**
     * The array representing the heap.
     */
    #heap: HeapNode<TElement, TPriority>[];
    
    /**
     * Create a new priority queue.
     * @param is_min - (Defaults to false). True if the priority queue should be a min-heap.
     */
    constructor(is_min: boolean = false) {
        this.is_min = is_min;
        this.#heap = [];
    }

    /**
     * Returns the number of elements in the priority queue.
     * @returns the size.
     */
    size(): number {
        return this.#heap.length;
    }

    /**
     * Returns True if the priority queue is empty.
     * @returns 
     */
    is_empty() {
        return this.size() == 0;
    }

    /**
     * Returns the next element to be popped off.
     * Undefined is returned if there are no elements.
     * @returns the topmost-element.
     */
    peek() {
        return this.#heap[0];
    }

    /**
     * Adds elements to the priority queue.
     * @param values `HeapNode`s to be added to the priority queue. 
     * @returns the new size of the priority queue.
     */
    push(...values: HeapNode<TElement, TPriority>[]) {
        values.forEach(value => {
            this.#heap.push(value);
            this.#siftUp();
        });
        return this.size();
    }

    /**
     * Pops the top-most element off the priority queue.
     * Undefined is returned if there are no elements.
     * @returns the element.
     */
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > 0) {
            this.#swap(0, bottom);
        }
        this.#heap.pop();
        this.#siftDown();
        return poppedValue;
    }

    /**
     * Clears the queue of all elements.
     */
    clear() {
        this.#heap = [];
    }

    /**
     * Given the index of a node, get the index of its parent.
     * @param i - the index of the node
     * @returns the index of the parent
     */
    #parent(i: number): number {
        return ((i + 1) >>> 1) - 1
    }

    /**
     * Given the index of a node, get the index of its left-child.
     * @param i - the index of the node
     * @returns the index of the left-child
     */
    #left(i: number): number {
        return (i << 1) + 1;
    }

    /**
     * Given the index of a node, get the index of its right-child.
     * @param i - the index of the node
     * @returns the index of the right-child
     */
    #right(i: number): number {
        return (i + 1) << 1;
    }

    /**
     * Swaps two elements in the heap without pushing down.
     * @param i - index of the first element
     * @param j - index of the second element
     */
    #swap(i: number, j: number) {
        let temp: HeapNode<TElement, TPriority> = this.#heap[i];
        this.#heap[i] = this.#heap[j];
        this.#heap[j] = temp;
    }

    /**
     * Move the bottommost element until it satisfies the heap property.
     */
    #siftUp() {
        let node: number = this.size() - 1;
        let parent: number = this.#parent(node);

        //  for a min-heap, the priority comparison is reversed
        if(this.is_min) {
            while (node > 0 && this.#heap[node].priority < this.#heap[parent].priority) {
                this.#swap(node, parent);
                node = parent;
                parent = this.#parent(node);
            }
        }
        else {
            while (node > 0 && this.#heap[node].priority > this.#heap[parent].priority) {
                this.#swap(node, parent);
                node = parent;
                parent = this.#parent(node);
            }
        }
    }

    /**
     * Moves the topmost element to the bottom until it satisfies the heap property.
     */
    #siftDown() {
        let node: number = 0;
        let left: number = this.#left(node);
        let right: number = this.#right(node);

        //  for a min-heap, the priority comparison is reversed
        if(this.is_min) {
            while (left < this.size()) {
                let max_child: number = left;
                
                if (right < this.size() && this.#heap[right].priority < this.#heap[left].priority) {
                    max_child = right;
                }
    
                if (this.#heap[node].priority < this.#heap[max_child].priority) {
                    break;
                }
    
                this.#swap(node, max_child);
                node = max_child;
                left = this.#left(node);
                right = this.#right(node);
            }
        }
        else {
            while (left < this.size()) {
                let max_child: number = left;
                
                if (right < this.size() && this.#heap[right].priority > this.#heap[left].priority) {
                    max_child = right;
                }
    
                if (this.#heap[node].priority >= this.#heap[max_child].priority) {
                    break;
                }
    
                this.#swap(node, max_child);
                node = max_child;
                left = this.#left(node);
                right = this.#right(node);
            }
        }
    }
}