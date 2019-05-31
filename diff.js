const { digest } = require('json-hash');

const isRealNumber = function(...args) {
  return args.every(function(arg) {
    return (typeof arg === 'number')
      && (isNaN(arg) === false)
      && (arg !== +Infinity)
      && (arg !== -Infinity);
  });
};

const isPlainObject = function(obj) {
  return obj !== null
    && typeof obj === 'object'
    && obj.constructor === Object;
};

const arrize = function(path, glue) {
  if (glue == null) {
    glue = '.';
  }

  return ((function() {
    if (Array.isArray(path)) {
      return path.slice(0);
    } else {
      switch (path) {
        case void 0:
        case null:
        case false:
        case '':
          return [];
        default:
          return path.toString().split(glue);
      }
    }
  })()).map(function(item) {
    switch (item) {
      case void 0:
      case null:
      case false:
      case '':
        return null;
      default:
        return item.toString();
    }
  }).filter(function(item) {
    return item != null;
  });
};

const diff = function(a, b, stack = [], options = {}, top = true, garbage = {}) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  const aN = aKeys.length;
  const bN = bKeys.length;
  let k;
  let aI = 0;
  let bI = 0;
  let aKey;
  let aVal;
  let bKey;
  let bVal;
  let delta = {
    $rename: {},
    $unset: {},
    $set: {},
    $inc: {}
  };
  stack = arrize(stack);

  const unsetA = function(i) {
    const key = (stack.concat(aKeys[i])).join('.');
    delta.$unset[key] = true;
    const hash = digest(a[aKeys[i]]);
    return (garbage[hash] || (garbage[hash] = [])).push(key);
  };
  const setB = function(i) {
    const key = (stack.concat(bKeys[i])).join('.');
    return delta.$set[key] = b[bKeys[i]];
  };
  const incA = function(i, d) {
    const key = (stack.concat(aKeys[i])).join('.');
    return delta.$inc[key] = d;
  };

  while ((aI < aN) && (bI < bN)) {
    aKey = aKeys[aI];
    bKey = bKeys[bI];

    if (aKey === bKey) {
      aVal = a[aKey];
      bVal = b[bKey];
      const { strictEqual = true, stringifyEqual } = options;
      
      switch (true) {
        case aVal === bVal
          || (!strictEqual && aVal == bVal)
          || (stringifyEqual && String(aVal) === String(bVal)):
          void 0;
          break;
        case ((aVal != null) && (bVal == null)) || ((aVal == null) && (bVal != null)):
          setB(bI);
          break;
        case (aVal instanceof Date) && (bVal instanceof Date):
          if (+aVal !== +bVal) {
            setB(bI);
          }
          break;
        case (aVal instanceof RegExp) && (bVal instanceof RegExp):
          if (String(aVal) !== String(bVal)) {
            setB(bI);
          }
          break;
        case isPlainObject(aVal) && isPlainObject(bVal):
          const ref = diff(aVal, bVal, stack.concat([aKey]), options, false, garbage);
          for (k in ref) {
            const val = ref[k];

            Object.keys(val).forEach((k2) => {
              const v2 = val[k2];
              delta[k][k2] = v2;
            });
          }
          break;
        case !isPlainObject(aVal) && !isPlainObject(bVal) && digest(aVal) === digest(bVal):
          void 0;
          break;
        default:
          if ((options.inc === true) && isRealNumber(aVal, bVal)) {
            incA(aI, bVal - aVal);
          } else {
            setB(bI);
          }
      }
      ++aI;
      ++bI;
    } else {
      if (aKey < bKey) {
        unsetA(aI);
        ++aI;
      } else {
        setB(bI);
        ++bI;
      }
    }
  }
  while (aI < aN) {
    unsetA(aI++);
  }
  while (bI < bN) {
    setB(bI++);
  }

  
  if (top) {
    const collect = (function() {
      const ref1 = delta.$set;
      const results = [];

      Object.keys(ref1).forEach((key) => {
        const val = ref1[key];
        const hash = digest(val);

        if (garbage[hash] != null && (key = garbage[hash].pop())) {
          results.push([k, key]);
        }
      });

      return results;
    })();

    for (let j = 0, len = collect.length; j < len; j++) {
      const e = collect[j];
      const k = e[0];
      const key = e[1];
      
      delta.$rename[key] = k;
      delete delta.$unset[key];
      delete delta.$set[k];
    }
  }

  Object.keys(delta).forEach((key) => {
    if (Object.keys(delta[key]).length === 0) {
      delete delta[key];
    }
  });

  if (Object.keys(delta).length === 0) {
    delta = false;
  }
  return delta;
};

module.exports = {
  arrize: arrize,
  diff: diff,
  isRealNumber: isRealNumber,
};
