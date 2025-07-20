import { Hashmap } from "./map.js";


//TESTING THE HASHMAP WORKING

const test = new Hashmap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.set('lion', 'roarrr')
test.set('moon', 'silver')

test.set('kite','flying');
test.set('dog','bark');
test.set('hat','cowboy');

console.log(test.has('moons'));
console.log(test.entries());
console.log(test.get('kite'));
test.clear();
console.log(test.length());