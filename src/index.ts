// src/index.ts

type ValueType = string | number | boolean | object | any[];

interface PathSegment {
  key: string;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean'; // Extend as needed
}
function parsePath(path: string): PathSegment[] {
    const segments = path.split('.');
    return segments.map(segment => {
      const [key, type] = segment.split(':') as [string, string];
      switch (type) {
        case 'array':
          return { key, type: 'array' };
        case 'obj':
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


  export function createObject(
    starterObject: Record<string, any> = {},
    path: string,
    value?: ValueType
  ): Record<string, any> {
    const pathSegments = parsePath(path);
    setValue(starterObject, pathSegments, value);
    return starterObject;
  }
