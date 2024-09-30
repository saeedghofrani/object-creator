// src/ObjectBuilder.ts

import { PathSegment, SegmentType, ValueType } from '../types/types';

/**
 * Handles the creation and updating of objects based on parsed paths.
 */
class ObjectBuilder {
  private pathSegments: PathSegment[];

  constructor(pathSegments: PathSegment[]) {
    this.pathSegments = pathSegments;
  }

  /**
   * Sets a value in an object or array based on the path segments.
   * Handles nested objects and arrays, creating them as needed.
   *
   * @param obj - The object in which the value will be set.
   * @param value - The value to set at the specified path.
   */
  public setValue(obj: Record<string, any>, value?: ValueType): void {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Target object must be a valid object.');
    }

    // Find the last array segment in the path
    const lastArrayIndex = this.pathSegments
      .map((seg, idx) => (seg.type === SegmentType.Array ? idx : -1))
      .filter(idx => idx !== -1)
      .pop();

    if (lastArrayIndex !== undefined) {
      // Traverse up to the last array segment
      let current: any = obj;
      for (let i = 0; i <= lastArrayIndex; i++) {
        const seg = this.pathSegments[i];
        if (seg.type === SegmentType.Array) {
          if (!Array.isArray(current[seg.key])) {
            current[seg.key] = [];
          }
          current = current[seg.key];
        } else {
          if (!(seg.key in current)) {
            current[seg.key] = seg.type === SegmentType.Object ? {} : [];
          }
          current = current[seg.key];
        }
      }

      // The remaining path after the last array segment
      const remainingPath = this.pathSegments.slice(lastArrayIndex + 1);

      if (remainingPath.length === 0) {
        // If no remaining path, push the value directly to the array
        current.push(value);
      } else {
        // Create the new object based on the remaining path
        let newObj: any = {};
        let nested = newObj;
        for (let i = 0; i < remainingPath.length - 1; i++) {
          const seg = remainingPath[i];
          nested[seg.key] = seg.type === SegmentType.Array ? [] : {};
          nested = nested[seg.key];
        }

        const lastSeg = remainingPath[remainingPath.length - 1];
        if (lastSeg.type === SegmentType.Array) {
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
      for (let i = 0; i < this.pathSegments.length - 1; i++) {
        const seg = this.pathSegments[i];
        if (!(seg.key in current)) {
          current[seg.key] = seg.type === SegmentType.Array ? [] : {};
        }
        current = current[seg.key];
      }

      const lastSeg = this.pathSegments[this.pathSegments.length - 1];
      if (lastSeg.type === SegmentType.Array) {
        if (!Array.isArray(current[lastSeg.key])) {
          current[lastSeg.key] = [];
        }
        current[lastSeg.key].push(value);
      } else {
        current[lastSeg.key] = value;
      }
    }
  }
}

export default ObjectBuilder; // Not exported in index.ts
