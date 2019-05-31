const recordDiff = require('./index');
const equalLength = (arr, name, len) => {
  return arr[name].length === len;
}

const a1 = [{id: 1}];
const b1 = [{id: 1, x: 2}];
console.log(equalLength(recordDiff(a1, b1, 'id'), 'changed', 1)
&& equalLength(recordDiff(a1, b1, 'id'), 'added', 0)
&& equalLength(recordDiff(a1, b1, 'id'), 'removed', 0));

const a2 = [{id: 1, x: 1}];
const b2 = [{id: 1, x: 2}, {id: 2, x: 2}];
console.log(equalLength(recordDiff(a2, b2, 'id'), 'changed', 1)
&& equalLength(recordDiff(a2, b2, 'id'), 'added', 1)
&& equalLength(recordDiff(a2, b2, 'id'), 'removed', 0));

const a3 = [{id: 1, x: 1}, {id: 3, x: 1}];
const b3 = [{id: 2, x: 2, y: 1}];
console.log(equalLength(recordDiff(a3, b3, 'id'), 'changed', 0)
&& equalLength(recordDiff(a3, b3, 'id'), 'added', 1)
&& equalLength(recordDiff(a3, b3, 'id'), 'removed', 2));

const a4 = [{id: 1, x: 1}];
const b4 = [{id: 1, x: 1, y: 1}, {id: 2, z: 2}];
console.log(equalLength(recordDiff(a4, b4, 'id'), 'changed', 1)
&& equalLength(recordDiff(a4, b4, 'id'), 'added', 1)
&& equalLength(recordDiff(a4, b4, 'id'), 'removed', 0));

const a5 = [{id: 1, x: 1}, {id: 2, z: 2}];
const b5 = [{id: 1, x: 1, y: 1}, {id: 2, z: 3}, {id: 3, i: 2}, {id: 4, i: 2}];
console.log(equalLength(recordDiff(a5, b5, 'id'), 'changed', 1)
&& equalLength(recordDiff(a5, b5, 'id'), 'added', 2)
&& equalLength(recordDiff(a5, b5, 'id'), 'removed', 1));

const a6 = [{id: 1, x: {a: 2}}];
const b6 = [{id: 1, x: {a: '21'}}];
console.log(equalLength(recordDiff(a6, b6, 'id'), 'changed', 1)
&& equalLength(recordDiff(a6, b6, 'id'), 'added', 0)
&& equalLength(recordDiff(a6, b6, 'id'), 'removed', 0));

const a7 = [{id: 1, x: {a: 0}}];
const b7 = [{id: 1, x: {a: '0'}}];
console.log(equalLength(recordDiff(a7, b7, 'id'), 'changed', 0)
&& equalLength(recordDiff(a7, b7, 'id'), 'added', 0)
&& equalLength(recordDiff(a7, b7, 'id'), 'removed', 0));
