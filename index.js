const { diff } = require('rus-diff');

function recordDiff(beforeRecord = [], afterRecord = [], keyName = 'id') {
  const beforeRecordCopy = beforeRecord.slice(0);
  const afterRecordCopy = afterRecord.slice(0);
  const changed = [];
  const removed = [];

  beforeRecordCopy.forEach((item1) => {
    const keyValue1 = item1[keyName];

    const isExist = afterRecordCopy.some((item2, index2) => {
      const keyValue2 = item2[keyName];

      if (keyValue1 === keyValue2) {
        afterRecordCopy.splice(index2, 1);
        if (diff(item1, item2)) {
          changed.push(item2);
        }
        return true;
      }
    });

    // When there is no matching record, the record is marked as deleted.
    if (!isExist) {
      removed.push(item1);
    }
  });

  return {
    changed,
    added: afterRecordCopy,
    removed
  }
}

module.exports = recordDiff;
