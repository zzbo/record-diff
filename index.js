const { diff } = require('./diff');

function recordDiff(beforeRecord = [], afterRecord = [], keyName = 'id', options = {}) {
  const beforeRecordCopy = beforeRecord.slice(0);
  const afterRecordCopy = afterRecord.slice(0);
  const changed = [];
  const removed = [];
  const changedDetails = [];
  const { strictEqual = true } = options;

  beforeRecordCopy.forEach((item1) => {
    const keyValue1 = item1[keyName];

    const isExist = afterRecordCopy.some((item2, index2) => {
      const keyValue2 = item2[keyName];

      if (keyValue1 === keyValue2 || (!strictEqual && keyValue1 == keyValue2)) {
        afterRecordCopy.splice(index2, 1);
        const diffResult = diff(item1, item2, null, options);

        if (diffResult) {
          changed.push(item2);
          changedDetails.push({
            [keyValue1]: diffResult
          });
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
    changedDetails,
    added: afterRecordCopy,
    removed
  }
}

module.exports = recordDiff;
