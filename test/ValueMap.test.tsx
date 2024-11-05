import { ValueMap } from "@/algorithm/ValueMap"; // Adjust the path as necessary

describe("ValueMap works when", () => {
    describe("set works when", () => {
        it("should set an element", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.size()).toBe(1);
            expect(value_map.get(1)).toBe("Alice");
        });

        it("should overwrite existing elements with the same key", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            value_map.set(1, "Bob"); // Same key with a different value
            expect(value_map.size()).toBe(1);
            expect(value_map.get(1)).toBe("Bob");
        });

        it("should add distinct keys", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            value_map.set(2, "Bob");
            expect(value_map.size()).toBe(2);
            expect(value_map.get(1)).toBe("Alice");
            expect(value_map.get(2)).toBe("Bob");
        });
    });

    describe("get works when", () => {
        it("should retrieve an existing element", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.get(1)).toBe("Alice");
        });

        it("should return undefined for non-existing keys", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.get(2)).toBeUndefined();
        });
    });

    describe("has works when", () => {
        it("should detect contained key", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.has(1)).toBeTruthy();
        });

        it("shouldn't detect a new key", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.has(2)).toBeFalsy();
        });
    });

    describe("delete works when", () => {
        it("should delete an existing key", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.size()).toBe(1);
            expect(value_map.has(1)).toBeTruthy();

            expect(value_map.delete(1)).toBeTruthy();

            expect(value_map.size()).toBe(0);
            expect(value_map.has(1)).toBeFalsy();
        });

        it("shouldn't delete a non-existing key", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            expect(value_map.size()).toBe(1);
            expect(value_map.has(1)).toBeTruthy();

            expect(value_map.delete(2)).toBeFalsy(); // Trying to delete a key that doesn't exist

            expect(value_map.size()).toBe(1);
            expect(value_map.has(1)).toBeTruthy();
        });
    });

    describe("clear works when", () => {
        it("should clear all elements", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            value_map.set(2, "Bob");
            expect(value_map.size()).toBe(2);

            value_map.clear();
            expect(value_map.size()).toBe(0);
            expect(value_map.has(1)).toBeFalsy();
            expect(value_map.has(2)).toBeFalsy();
        });
    });
    
    describe("keys works when", () => {
        it("should return all keys", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            value_map.set(2, "Bob");

            let keys: number[] = value_map.keys();

            expect(keys.length).toBe(2);
            expect(keys).toContain(1);
            expect(keys).toContain(1);
        });
    });

    describe("values works when", () => {
        it("should return all values", () => {
            let value_map: ValueMap<number, string> = new ValueMap();
            value_map.set(1, "Alice");
            value_map.set(2, "Bob");

            let values: string[] = value_map.values();

            expect(values.length).toBe(2);
            expect(values).toContain("Alice");
            expect(values).toContain("Bob");
        });
    });
});