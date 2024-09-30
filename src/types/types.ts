// src/types.ts

export type ValueType = string | number | boolean | Record<string, any> | any[];

export enum SegmentType {
  Object = 'object',
  Array = 'array',
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export interface PathSegment {
  key: string;
  type: SegmentType;
}
