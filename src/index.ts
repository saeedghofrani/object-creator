type ValueType = string | number | boolean | object | any[];

interface PathSegment {
  key: string;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean'; // Extend as needed
}

/**
 * Parses a string path into an array of PathSegments, each segment containing a key and a type.
 *
 * @param {string} path - The string path in the format `key:type`, where type can be `array`, `object`, `string`, `number`, `boolean`.
 * @returns {PathSegment[]} An array of PathSegments with key and type for each segment.
 */
function parsePath(path: string): PathSegment[] {
    const segments = path.split('.');
    return segments.map(segment => {
      const [key, type] = segment.split(':') as [string, string];
      switch (type) {
        case 'array':
          return { key, type: 'array' };
        case 'obj':
        case 'object':
          return { key, type: 'object' };
        case 'string':
        case 'number':
        case 'boolean':
          return { key, type };
        default:
          return { key, type: 'object' }; // Default to object if type is unspecified
      }
    });
}

/**
 * Sets a value in an object or array based on a path of segments.
 * Handles nested objects and arrays, creating them as needed.
 *
 * @param {Record<string, any>} obj - The object in which the value will be set.
 * @param {PathSegment[]} pathSegments - The parsed path segments that define the navigation structure.
 * @param {ValueType} [value] - The value to set at the specified path.
 */
function setValue(obj: Record<string, any>, pathSegments: PathSegment[], value?: ValueType) {
    // Find the last array segment in the path
    const lastArrayIndex = pathSegments
      .map((seg, idx) => (seg.type === 'array' ? idx : -1))
      .filter(idx => idx !== -1)
      .pop();

    if (lastArrayIndex !== undefined) {
      // Traverse up to the last array segment
      let current: any = obj;
      for (let i = 0; i <= lastArrayIndex; i++) {
        const seg = pathSegments[i];
        if (seg.type === 'array') {
          if (!Array.isArray(current[seg.key])) {
            current[seg.key] = [];
          }
          current = current[seg.key];
        } else {
          if (!(seg.key in current)) {
            current[seg.key] = {};
          }
          current = current[seg.key];
        }
      }

      // The remaining path after the last array segment
      const remainingPath = pathSegments.slice(lastArrayIndex + 1);

      if (remainingPath.length === 0) {
        // If no remaining path, push the value directly to the array
        current.push(value);
      } else {
        // Create the new object based on the remaining path
        let newObj: any = {};
        let nested = newObj;
        for (let i = 0; i < remainingPath.length - 1; i++) {
          const seg = remainingPath[i];
          nested[seg.key] = seg.type === 'array' ? [] : {};
          nested = nested[seg.key];
        }

        const lastSeg = remainingPath[remainingPath.length - 1];
        if (lastSeg.type === 'array') {
          nested[lastSeg.key] = [value];
        } else {
          nested[lastSeg.key] = value;
        }

        // Push the new object to the array
        current.push(newObj);
      }
    } else {
      // No array segments, traverse and set value normally
      let current: any = obj;
      for (let i = 0; i < pathSegments.length - 1; i++) {
        const seg = pathSegments[i];
        if (!(seg.key in current)) {
          current[seg.key] = seg.type === 'array' ? [] : {};
        }
        current = current[seg.key];
      }

      const lastSeg = pathSegments[pathSegments.length - 1];
      if (lastSeg.type === 'array') {
        if (!Array.isArray(current[lastSeg.key])) {
          current[lastSeg.key] = [];
        }
        current[lastSeg.key].push(value);
      } else {
        current[lastSeg.key] = value;
      }
    }
}

/**
 * Creates or updates an object by setting a value at a specified path.
 * Handles nested objects and arrays based on the provided path and value.
 *
 * @param {Record<string, any>} [starterObject={}] - The initial object to update or create.
 * @param {string} path - The string path indicating where to set the value (e.g., "foo:object.bar:array").
 * @param {ValueType} [value] - The value to set at the specified path.
 * @returns {Record<string, any>} The updated object.
 */
export function createObject(
    starterObject: Record<string, any> = {},
    path: string,
    value?: ValueType
): Record<string, any> {
    const pathSegments = parsePath(path);
    setValue(starterObject, pathSegments, value);
    return starterObject;
}
