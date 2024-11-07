/**
 * A map that performs equality comparisons by value rather than by reference.
 */
export class ValueMap<TKey, TValue> {
    /**
     * The internal map of hashed string values to values.
     */
    #map: Map<string, TValue>;

    constructor() {
        this.#map = new Map<string, TValue>();
    }

    /**
     * Hashes the key by simply transforming it into a string.
     * @param key the key 
     * @returns the hashed key
     */
    #hash_key(key: TKey): string {
        return JSON.stringify(key);
    }

    /**
     * Sets the key-value pair in the map.
     * @param key - the key
     * @param value - the value
     */
    set(key: TKey, value: TValue) {
        const hash = this.#hash_key(key);
        this.#map.set(hash, value);
    }

    /**
     * Gets a value from the map, if it exists.
     * @param key - the key
     * @returns the value
     */
    get(key: TKey): TValue | undefined {
        const hash = this.#hash_key(key);
        return this.#map.get(hash);
    }

    /**
     * Checks if the key exists in the map.
     * @param key - the key
     * @returns True if the key exists.
     */
    has(key: TKey): boolean {
        const hash = this.#hash_key(key);
        return this.#map.has(hash);
    }

    /**
     * Removes a key-value pair from the map.
     * @param key - the key
     * @returns True if it was removed.
     */
    delete(key: TKey): boolean {
        const hash = this.#hash_key(key);
        return this.#map.delete(hash);
    }

    /**
     * Clears the map.
     */
    clear(): void {
        this.#map.clear();
    }

    /**
     * Returns the size of the map.
     * @returns the size of the map.
     */
    size(): number {
        return this.#map.size;
    }

    /**
     * Returns an array of the keys in the map.
     * @returns 
     */
    keys(): TKey[] {
        return Array.from(this.#map.keys()).map(key => JSON.parse(key));
    }

    /**
     * Returns an array of the values in the map.
     * @returns 
     */
    values(): TValue[] {
        return Array.from(this.#map.values());
    }
}