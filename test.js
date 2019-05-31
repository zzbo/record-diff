const recordDiff = require('./index');

const a1 = [1];
const b1 = [2];

console.log(recordDiff(a1, b1));

const a2 = [{x: 1}];
const b2 = [{x: 1}];

console.log(recordDiff(a2, b2));

const a3 = [{x: 1}];
const b3 = [{x: 1, y: 1}];

console.log(recordDiff(a3, b3));

const a4 = [{x: 1}];
const b4 = [{x: 1, y: 1}, {z: 2}];

console.log(recordDiff(a4, b4));

const a5 = [{x: 1}, {z: 2}];
const b5 = [{x: 1, y: 1}, {i: 2}];

console.log(recordDiff(a5, b5));

