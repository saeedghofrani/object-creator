// src/test.ts
import { createObject } from './index';

const arrayResult1 = createObject({}, 'saeed:obj.x:array.y:string', 'arrayValue1');
console.log(JSON.stringify(arrayResult1, null, 2));
// Expected output:
// {
//   "saeed": {
//     "obj": {
//       "x": [
//         {
//           "y": "arrayValue1"
//         }
//       ]
//     }
//   }
// }

const arrayResult2 = createObject(arrayResult1, 'saeed:obj.x:array.y:string', 'arrayValue2');
console.log(JSON.stringify(arrayResult2, null, 2));
// Expected output:
// {
//   "saeed": {
//     "obj": {
//       "x": [
//         {
//           "y": "arrayValue1"
//         },
//         {
//           "y": "arrayValue2"
//         }
//       ]
//     }
//   }
// }

const multipleEntries = (() => {
  const obj: Record<string, any> = {};
  createObject(obj, 'saeed:obj.x:array.y:string', 'arrayValue1');
  createObject(obj, 'saeed:obj.x:array.y:string', 'arrayValue2');
  return obj;
})();
console.log(JSON.stringify(multipleEntries, null, 2));
// Expected output:
// {
//   "saeed": {
//     "obj": {
//       "x": [
//         {
//           "y": "arrayValue1"
//         },
//         {
//           "y": "arrayValue2"
//         }
//       ]
//     }
//   }
// }
