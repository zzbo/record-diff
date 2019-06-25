# record-diff

> 一个对比两个记录集的差异的工具包，根据指定 keyName 来对比两条记录，并可分析出差异路径。
> - 可设置忽略某个键值
> - 支持是否全等对比
> - 输出差异节点路径
> - 细分变更类型，按新增，修改，删除


## Installation

```bash
npm i record-diff
```

## Usage
```js
const recordDiff = require('record-diff');
const a1 = [{id: 1 x: 'sth here', y: 'yy'}, {id: 2, xx: 1}];
const b1 = [{id: 1, x: 'sth changed', z: 'zz'}, {id: 3, xxx: 2}];
console.log(recordDiff(a1, b1, 'id'));
```
##### output:
```json
{
    "changed": [ // 被变更的记录
        {
            "id": 1,
            "x": "sth changed",
            "z": "zz"
        }
    ],
    "changedDetails": [ // 被变更记录的详细路径节点
        {
            "1": {
                "$unset": {
                    "y": true
                },
                "$set": {
                    "x": "sth changed",
                    "z": "zz"
                }
            }
        }
    ],
    "added": [ // 新增的记录
        {
            "id": 3,
            "xxx": 2
        }
    ],
    "removed": [ // 移除的记录
        {
            "id": 2,
            "xx": 1
        }
    ]
}
```

## API
```js
recordDiff(beforeRecord, afterRecord, keyName, options);
```

#### beforeRecord = [] `Array`
被对比的数据集

#### afterRecord = [] `Array`
新的数据集

#### key = 'id' `String|Number`
每条记录中的主键，用于对于

#### options
- strictEqual = true `boolean`
是否使用严格匹配模式来对比每个值，即使用 `===`  
  
- ignoreKey `string`  
忽略对比某个 key  
  
- stringifyEqual = false `boolean`
是否把值都转为 String 值来对比

- inc = false `boolean`
是否对比差值，如果为 true，则尝试转换值为数值类型，并计算差值，会在 changedDetails $inc 字段中体现。
