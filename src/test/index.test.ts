import { createObject } from '../index';

describe('createObject', () => {
  test('should create a simple object with string value', () => {
    const result = createObject({}, 'foo:string', 'bar');
    expect(result).toEqual({ foo: 'bar' });
  });

  test('should create a nested object structure', () => {
    const result = createObject({}, 'foo:object.bar:string', 'baz');
    expect(result).toEqual({ foo: { bar: 'baz' } });
  });

  test('should create an array within the object', () => {
    const result = createObject({}, 'foo:array', 'bar');
    expect(result).toEqual({ foo: ['bar'] });
  });

  test('should create a nested array inside an object', () => {
    const result = createObject({}, 'foo:object.bar:array', 'baz');
    expect(result).toEqual({ foo: { bar: ['baz'] } });
  });

  test('should add values to an existing array', () => {
    const starterObject = { foo: ['bar'] };
    const result = createObject(starterObject, 'foo:array', 'baz');
    expect(result).toEqual({ foo: ['bar', 'baz'] });
  });

  test('should create a deeply nested object structure', () => {
    const result = createObject({}, 'foo:object.bar:object.baz:string', 'qux');
    expect(result).toEqual({ foo: { bar: { baz: 'qux' } } });
  });

  test('should create an object with boolean value', () => {
    const result = createObject({}, 'foo:boolean', true);
    expect(result).toEqual({ foo: true });
  });

  test('should handle multiple arrays and objects', () => {
    const result = createObject({}, 'foo:object.bar:array.baz:object.qux:string', 'test');
    expect(result).toEqual({
      foo: {
        bar: [
          {
            baz: {
              qux: 'test',
            },
          },
        ],
      },
    });
  });

  test('should handle creating a number value in an object', () => {
    const result = createObject({}, 'foo:number', 42);
    expect(result).toEqual({ foo: 42 });
  });

  test('should append to an array in a deeply nested object', () => {
    const starterObject = { foo: { bar: [{ baz: { qux: 'test' } }] } };
    const result = createObject(starterObject, 'foo:object.bar:array.baz:object.qux:string', 'new-test');
    expect(result).toEqual({
      foo: {
        bar: [
          { baz: { qux: 'test' } },
          { baz: { qux: 'new-test' } },
        ],
      },
    });
  });

  test('should append to an array if it exists and the path has arrays', () => {
    const starterObject = { foo: [{ bar: 'initial' }] };
    const result = createObject(starterObject, 'foo:array.bar:string', 'second');
    expect(result).toEqual({
      foo: [
        { bar: 'initial' },
        { bar: 'second' },
      ],
    });
  });

  test('should create object structure if array exists but needs new properties', () => {
    const starterObject = { foo: [] };
    const result = createObject(starterObject, 'foo:array.bar:string', 'new-bar');
    expect(result).toEqual({
      foo: [
        { bar: 'new-bar' },
      ],
    });
  });

  test('should push value directly when remainingPath is empty', () => {
    const result = createObject({}, 'foo:array', 'bar');
    expect(result).toEqual({ foo: ['bar'] });
  });
});
