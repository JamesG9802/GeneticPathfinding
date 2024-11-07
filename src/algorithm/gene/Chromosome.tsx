import { shuffle } from "../../utils/Helper";

/**
 * An encoding of movement vectors.
 * Based on pg. 66 in
 * https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf.
 */
export type Chromosome = {
    /**
     * The distances of the movement vectors. Values are in the range [0.1, 1];
     */
    distances: number[]

    /**
     * The direction of the movemnt vectors. Values are in the set { -1, 0, 1 };
     * To align with the paper, the convention for the axises are
     * - Horizontal: 
     *      - LEFT      is -1
     *      - RIGHT     is +1
     * - Vertical:
     *      - DOWN      is -1
     *      - UP        is +1
     * - Depth:
     *      - BACK      is -1
     *      - FORWARD   is +1
     */
    directions: number[]
}

/**
 * Creates a random individual for a given number of movement vectors.
 * @param number_of_vectors - the number of movement vectors.
 * @returns the random individual.
 */
export function random_individual(number_of_vectors: number): Chromosome {
    let distances: number[] = [];
    let directions: number[] = [];

    for(let i = 0; i < number_of_vectors; i++) {
        distances.push(Math.random() * 0.9 + 0.1);
        directions.push(Math.floor(Math.random() * 3) - 1);
    }
    return {distances: distances, directions: directions};
}

/**
 * Creates a random individual by randomly taking half the traits from each parent.
 * Assumes that the parents have the same number of distances and directions.
 * @param a - parent 1
 * @param b - parent 2
 * @returns the random individual
 */
export function crossover_individuals(a: Chromosome, b: Chromosome): Chromosome {
    let child_distances: number[] = [];
    let child_directions: number[] = [];
    
    //  An array of which parent is contributing the genome. 0 for a and 1 for b.
    let inheritance_distances: number[] = [];
    let inheritance_directions: number[] = [];

    for(let i = 0; i < a.distances.length; i++) {
        inheritance_distances.push(0, 1);
        inheritance_directions.push(0, 1);
    }

    shuffle(inheritance_distances);
    shuffle(inheritance_directions);

    for(let i = 0; i < inheritance_distances.length; i++) {
        //  Distances
        if(inheritance_distances[i] == 0) {
            child_distances.push(a.distances[i]);
        }
        else {
            child_distances.push(b.distances[i]);
        }

        //  Directions
        if(inheritance_directions[i] == 0) {
            child_directions.push(a.directions[i]);
        }
        else {
            child_directions.push(b.directions[i]);
        }
    }

    return {distances: child_distances, directions: child_directions};
}

/**
 * Create a random individual by mutating the values from another individual.
 * The exact process on how the mutation is performed is not detailed so an assumption
 * is made that the "25% established rate" is referring to the chance of a value changing.
 * https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf
 * @param individual - the source individual
 * @returns the new individual
 */
export function mutate_individual(individual: Chromosome): Chromosome {
    let child_distances: number[] = [];
    let child_directions: number[] = [];

    for(let i = 0; i < individual.distances.length; i++) {
        if(Math.random() * 0.25) {
            child_distances.push(Math.random() * 0.9 + 0.1);
        }
        else {
            child_distances.push(individual.distances[i]);
        }
    }
    for(let i = 0; i < individual.directions.length; i++) {
        if(Math.random() * 0.25) {
            child_directions.push(Math.floor(Math.random() * 3) - 1);
        }
        else {
            child_directions.push(individual.directions[i]);
        }
    }

    return {distances: child_distances, directions: child_directions};
}

/**
 * Calculates the fitness of a candidate path.
 * Based on pg. 67 in 
 * https://www.sbgames.org/sbgames2012/proceedings/papers/computacao/comp-full_09.pdf.
 * @param heuristic - the estimated distance from the end of the path to the goal.
 * @param total_movement - the sum of half the distance moved
 * @param roof - the upper limit of distance travelled
 * @returns the fitness.
 */
export function calculate_fitness(
    heuristic: number,
    total_movement: number,
    roof: number
) 
{
    return (roof - heuristic - total_movement * 0.1);
}