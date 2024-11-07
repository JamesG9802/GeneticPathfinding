/**
 * Fisher-Yates shuffle.
 * @param array - the array to be shuffled.
 */
export function shuffle(array: any[]) {
    let index: number = array.length;

    while(index != 0) {
        let random_index: number = Math.floor(Math.random() * index);
        index -= 1;
        
        let temp: any = array[index];
        array[index] = array[random_index];
        array[random_index] = temp;
    }
}