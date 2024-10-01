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

Import the `DynamicObject` class into your project and use it to build nested objects based on string paths.

### Basic Example

Creating a simple nested object without arrays:

```typescript
import { DynamicObject } from 'object-creator';

const dynObj = new DynamicObject();
dynObj.set('user:object.name:string', 'Alice');
console.log(dynObj.getObject());
// Output: { user: { name: 'Alice' } }
```

### Handling Arrays

Creating nested structures that include arrays:

```typescript
import { DynamicObject } from 'object-creator';

const dynObj = new DynamicObject();
dynObj.set('user:object.emails:array', 'alice@example.com');
console.log(dynObj.getObject());
// Output: { user: { emails: ['alice@example.com'] } }
```

### Multiple Entries

Adding multiple entries to an array:

```typescript
import { DynamicObject } from 'object-creator';

const dynObj = new DynamicObject();

// Adding first email
dynObj.set('user:object.emails:array', 'alice@example.com');

// Adding second email
dynObj.set('user:object.emails:array', 'alice.work@example.com');

console.log(dynObj.getObject());
// Output:
// {
//   user: {
//     emails: ['alice@example.com', 'alice.work@example.com']
//   }
// }
```

## API Reference

### `DynamicObject`

Encapsulates the object being manipulated and provides methods to interact with it.

#### Constructor

```typescript
constructor(initialObject?: Record<string, any>);
```

- **Parameters:**
  - `initialObject` (optional): The initial object to update or create. Defaults to an empty object `{}` if not provided.

#### Methods

##### `set(path: string, value?: ValueType): Record<string, any>`

Creates or updates a value at the specified path.

- **Parameters:**
  - `path` (`string`): The string path indicating where to set the value (e.g., `"user:object.emails:array"`).
  - `value` (`ValueType`): The value to set at the specified path.

- **Returns:**
  - `Record<string, any>`: The updated object.

- **Example:**

  ```typescript
  dynObj.set('user:object.age:number', 30);
  console.log(dynObj.getObject());
  // Output: { user: { age: 30 } }
  ```

##### `getObject(): Record<string, any>`

Retrieves the internal object.

- **Returns:**
  - `Record<string, any>`: The current object.

- **Example:**

  ```typescript
  const obj = dynObj.getObject();
  console.log(obj);
  ```

### Type Definitions

```typescript
type ValueType = string | number | boolean | Record<string, any> | any[];
```

### Path Syntax

- **Structure:**
  - Use `:` to denote the type of the current segment.
  - Specify the data type after the colon (e.g., `string`, `number`, `boolean`, `object`, `array`).
  - Separate nested keys with a dot `.`.

- **Examples:**
  - `'user:object.name:string'` creates `{ user: { name: 'value' } }`.
  - `'users:object.list:array.username:string'` creates `{ users: { list: [ { username: 'value' } ] } }`.

- **Handling Arrays:**
  - When a segment is specified as an `array`, subsequent segments within that array item can be defined.
  - Each call to `set` with the same array path will append a new entry to the array.

### Examples

```typescript
// Creating a simple nested object
dynObj.set('user:object.profile.name:string', 'Alice');
console.log(dynObj.getObject());
// Output: { user: { profile: { name: 'Alice' } } }

// Creating a nested object with an array
dynObj.set('users:object.list:array.username:string', 'Bob');
console.log(dynObj.getObject());
// Output: { user: { profile: { name: 'Alice' } }, users: { list: [ { username: 'Bob' } ] } }

// Adding another user to the array
dynObj.set('users:object.list:array.username:string', 'Charlie');
console.log(dynObj.getObject());
// Output:
// {
//   user: { profile: { name: 'Alice' } },
//   users: {
//     list: [
//       { username: 'Bob' },
//       { username: 'Charlie' }
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
