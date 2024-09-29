
# Object Creator

**Object Creator** is a TypeScript-compatible utility that allows you to create nested JavaScript objects based on string paths. It supports dynamic object structures, including arrays and various data types, making it a versatile tool for managing complex data structures.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Handling Arrays](#handling-arrays)
  - [Multiple Entries](#multiple-entries)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `object-creator` via npm:

```bash
npm install object-creator
```

Or using Yarn:

```bash
yarn add object-creator
```

## Usage

Import the `createObject` function into your project and use it to build nested objects based on string paths.

### Basic Example

Creating a simple nested object without arrays:

```typescript
import { createObject } from 'object-creator';

const obj = createObject({}, 'saeed.obj.x.y', 'value');
console.log(obj);
/*
{
  "saeed": {
    "obj": {
      "x": {
        "y": "value"
      }
    }
  }
}
*/
```

### Handling Arrays

Creating nested structures that include arrays:

```typescript
import { createObject } from 'object-creator';

const obj = createObject({}, 'saeed:obj.x:array.y:string', 'arrayValue');
console.log(obj);
/*
{
  "saeed": {
    "obj": {
      "x": [
        {
          "y": "arrayValue"
        }
      ]
    }
  }
}
*/
```

### Multiple Entries

Adding multiple entries to an array:

```typescript
import { createObject } from 'object-creator';

const obj = {};
createObject(obj, 'saeed:obj.x:array.y:string', 'arrayValue1');
createObject(obj, 'saeed:obj.x:array.y:string', 'arrayValue2');
console.log(obj);
/*
{
  "saeed": {
    "obj": {
      "x": [
        {
          "y": "arrayValue1"
        },
        {
          "y": "arrayValue2"
        }
      ]
    }
  }
}
*/
```

## API Reference

`createObject(starterObject?: Record<string, any>, path: string, value?: ValueType): Record<string, any>`

Creates a nested object based on the provided string path.

### Parameters:

- **starterObject (optional)**: The initial object to build upon. If not provided, an empty object `{}` is used.
- **path (string)**: The string path defining the structure. Use `:` to denote arrays and specify types. For example, `'saeed:obj.x:array.y:string'`.
- **value (optional)**: The value to assign at the specified path.

### Returns:

A new object with the nested structure based on the path and value provided.

### Type Definitions:

```typescript
type ValueType = string | number | boolean | object | any[];
```

### Path Syntax:

- Use `:` to indicate that a segment should be an array.
- Specify the data type after the colon (e.g., `string`, `number`, `boolean`, `object`).
- Separate nested keys with a dot `.`.

### Examples:

```typescript
// Creating a simple nested object
createObject({}, 'user.profile.name', 'Alice');
// Result:
// {
//   "user": {
//     "profile": {
//       "name": "Alice"
//     }
//   }
// }

// Creating a nested object with an array
createObject({}, 'users:obj.list:array.username:string', 'Bob');
// Result:
// {
//   "users": {
//     "list": [
//       {
//         "username": "Bob"
//       }
//     ]
//   }
// }
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/object-creator.git
   ```

3. **Navigate to the Project Directory**

   ```bash
   cd object-creator
   ```

4. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Your Changes**

   Implement your feature or bug fix.

6. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

7. **Push to the Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**

   Go to the original repository and click on "Compare & pull request" to submit your changes for review.

## License

This project is licensed under the MIT License.
