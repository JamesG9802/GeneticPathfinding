import { shuffle } from "@/utils/Helper";

describe("Helper works when", () => {
    describe("Shuffle works when", () => {
        it("elements roughly randomn", () => {
            //  This is not statistically rigorous

            let num_trials: number = 10_000;
            let num_elements: number = 50;
            let expected_value: number = (num_elements - 1) / 2;
            let tolerance: number = .5;

            let elements: number[] = [];
            let evaluation_array: number[] = [];
            for(let i = 0; i < num_elements; i++) {
                elements.push(i);
                evaluation_array.push(0);    
            }

            //  Over a number of trials,
            //  generate 50 element size arrays of values [0, 1, ..., 49]
            //  Add each value's index to evaluation array.
            //  if the shuffle is random, then each value should occupy each value
            //  roughly the same number of times.
            //  this means that the evaluation_array should be (0+49)/2 * num_trials

            for(let i = 0; i < num_trials; i++) {
                shuffle(elements);
                let length: number = elements.length;
                for(let j = 0; j < length; j++) {
                    evaluation_array[elements[j]] += j;
                }
            }

            for(let i = 0; i < evaluation_array.length; i++) {
                expect(Math.abs(evaluation_array[i] / num_trials - expected_value) < tolerance).toBeTruthy();
            }
        })
    });
})