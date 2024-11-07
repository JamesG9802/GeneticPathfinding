/**
 * A set that performs equality comparisons by value rather than by reference.
 */
export class ValueSet<T> {
    /**
     * An array containing all the values.
     */
    #set: T[];
    
    /**
     * Closure that checks if two elements are the same.
     */
    #comparison: (a: T, b: T) => boolean;

    constructor(comparison: (a: T, b: T) => boolean) {
        this.#set = [];
        this.#comparison = comparison;
    }

    /**
     * Adds an item to the set.
     * @param item the item to be added
     */
    add(item: T) {
        if (!this.has(item)) {
            this.#set.push(item);
        }
        return this;
    }

    /**
     * Returns true if the item is in the set.
     * @param item - the item to be checked
     * @returns 
     */
    has(item: T): boolean {
        return this.#set.some(element => this.#comparison(element, item));
    }

    /**
     * Removes an item from the set.
     * @param item - the item to be removed
     * @returns true if an element was removed.
     */
    delete(item: T): boolean {
        const index = this.#set.findIndex(element => this.#comparison(element, item));
        if (index !== -1) {
            this.#set.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Clears the set.
     */
    clear() {
        this.#set = [];
    }

    /**
     * Returns a shallow copy of the set.
     * @returns 
     */
    values(): T[] {
        return this.#set.slice(); // Return a copy of the items
    }

    /**
     * Returns the number of elements in the set.
     * @returns
     */
    size(): number {
        return this.#set.length;
    }
}