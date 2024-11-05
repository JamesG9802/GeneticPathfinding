import { ValueSet } from "@/algorithm/ValueSet";

describe("ValueSet works when", () => {
    describe("add works when", () => {
        it("should add an element", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
        });
        it("should not add duplicate elements", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
        });
        it("should add distinct elements", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            value_set.add(2);
            expect(value_set.size() == 2).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
            expect(value_set.has(2)).toBeTruthy();
        });
    })
    describe("has works when", () => {
        it("should detect contained element", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
        });
        it("shouldn't detect new element", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(2)).toBeFalsy();
        });
    })
    describe("delete works when", () => {
        it("should delete contained element", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();

            expect(value_set.delete(1)).toBeTruthy();

            expect(value_set.size() == 0).toBeTruthy();
            expect(value_set.has(1)).toBeFalsy();
        });
        it("shouldn't delete new element", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
            
            expect(value_set.delete(0)).toBeFalsy();
            
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();
        });
    })
    describe("clear works when", () => {
        it("should delete all elements", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            expect(value_set.size() == 1).toBeTruthy();
            expect(value_set.has(1)).toBeTruthy();

            value_set.clear();
            expect(value_set.size() == 0).toBeTruthy();
            expect(value_set.has(1)).toBeFalsy();
        });
    })
    describe("values works when", () => {
        it("should returns all elements", () => {
            let value_set: ValueSet<number> = new ValueSet((a: number, b: number) => a == b);
            value_set.add(1);
            value_set.add(2);

            let values: number[] = value_set.values();
            
            expect(values.length == 2).toBeTruthy();
            expect(values.includes(1)).toBeTruthy();
            expect(values.includes(2)).toBeTruthy();
        });
    })
});