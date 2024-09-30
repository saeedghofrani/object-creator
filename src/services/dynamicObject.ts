// src/DynamicObject.ts

import PathParser from './pathParser';
import ObjectBuilder from './objectBuilder';
import { ValueType } from '../types/types';

/**
 * Encapsulates the object being manipulated and provides methods to interact with it.
 */
export class DynamicObject {
  private obj: Record<string, any>;
  private parser: PathParser;

  /**
   * Initializes a new instance of DynamicObject.
   *
   * @param initialObject - The initial object to update or create.
   */
  constructor(initialObject: Record<string, any> = {}) {
    this.obj = initialObject;
    this.parser = new PathParser();
  }

  /**
   * Creates or updates a value at the specified path.
   *
   * @param path - The string path indicating where to set the value (e.g., "foo:object.bar:array").
   * @param value - The value to set at the specified path.
   * @returns The updated object.
   */
  public set(path: string, value?: ValueType): Record<string, any> {
    const pathSegments = this.parser.parse(path);
    const builder = new ObjectBuilder(pathSegments);
    builder.setValue(this.obj, value);
    return this.obj;
  }

  /**
   * Retrieves the internal object.
   *
   * @returns The current object.
   */
  public getObject(): Record<string, any> {
    return this.obj;
  }
}
