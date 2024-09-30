// src/PathParser.ts

import { PathSegment, SegmentType } from '../types/types';

/**
 * Parses a string path into an array of PathSegments, each segment containing a key and a type.
 */
class PathParser {
  /**
   * Parses a string path into an array of PathSegments.
   *
   * @param path - The string path in the format `key:type`, separated by dots (e.g., "foo:object.bar:array").
   * @returns An array of PathSegments with key and type for each segment.
   */
  public parse(path: string): PathSegment[] {
    if (!path) {
      throw new Error("Path cannot be empty");
    }

    const segments = path.split('.');
    return segments.map(segment => {
      const [key, type] = segment.split(':') as [string, string];
      if (!key) {
        throw new Error(`Invalid path segment: "${segment}"`);
      }

      switch (type) {
        case 'array':
          return { key, type: SegmentType.Array };
        case 'obj':
        case 'object':
          return { key, type: SegmentType.Object };
        case 'string':
        case 'number':
        case 'boolean':
          return { key, type: type as SegmentType };
        default:
          throw new Error(`Unsupported segment type: "${type}" in segment "${segment}"`);
      }
    });
  }
}

export default PathParser; // Not exported in index.ts
