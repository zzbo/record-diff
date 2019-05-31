const recordDiff = require('./index');

const a1 = [{id: 1}];
const b1 = [{id: 1, x: 2}];

console.log(recordDiff(a1, b1, 'id'));

const a2 = [{id: 1, x: 1}];
const b2 = [{id: 1, x: 1}, {id: 2, x: 2}];

console.log(recordDiff(a2, b2, 'id'));

const a3 = [{id: 1, x: 1}];
const b3 = [{id: 2, x: 2, y: 1}];

console.log(recordDiff(a3, b3, 'id'));

const a4 = [{id: 1, x: 1}];
const b4 = [{id: 1, x: 1, y: 1}, {id: 2, z: 2}];

console.log(recordDiff(a4, b4, 'id'));

const a5 = [{id: 1, x: 1}, {id: 2, z: 2}];
const b5 = [{id: 1, x: 1, y: 1}, {id: 3, i: 2}, {id: 4, i: 2}];

console.log(recordDiff(a5, b5));

