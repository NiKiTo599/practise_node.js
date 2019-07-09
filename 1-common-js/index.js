const sum = require('./a');
const { add } = require('./b');
const moduleC = require('./c');

console.log(sum(4, 5));
console.log(add(4, 5));
console.log(moduleC.pow(2, 5));
console.log(moduleC.dev(20, 4));