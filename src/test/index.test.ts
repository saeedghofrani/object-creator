import { DynamicObject } from '../index'; // Ensure the correct path

describe('DynamicObject', () => {
  test('should create a simple object with string value', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:string', 'bar');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: 'bar' });
  });

  test('should create a nested object structure', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:object.bar:string', 'baz');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: { bar: 'baz' } });
  });

  test('should create an array within the object', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:array', 'bar');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: ['bar'] });
  });

  test('should create a nested array inside an object', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:object.bar:array', 'baz');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: { bar: ['baz'] } });
  });

  test('should add values to an existing array', () => {
    const starterObject = { foo: ['bar'] };
    const dynObj = new DynamicObject(starterObject);
    dynObj.set('foo:array', 'baz');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: ['bar', 'baz'] });
  });

  test('should create a deeply nested object structure', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:object.bar:object.baz:string', 'qux');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: { bar: { baz: 'qux' } } });
  });

  test('should create an object with boolean value', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:boolean', true);
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: true });
  });

  test('should handle multiple arrays and objects', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:object.bar:array.baz:object.qux:string', 'test');
    const result = dynObj.getObject();
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
    const dynObj = new DynamicObject();
    dynObj.set('foo:number', 42);
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: 42 });
  });

  test('should append to an array in a deeply nested object', () => {
    const starterObject = { foo: { bar: [{ baz: { qux: 'test' } }] } };
    const dynObj = new DynamicObject(starterObject);
    dynObj.set('foo:object.bar:array.baz:object.qux:string', 'new-test');
    const result = dynObj.getObject();
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
    const dynObj = new DynamicObject(starterObject);
    dynObj.set('foo:array.bar:string', 'second');
    const result = dynObj.getObject();
    expect(result).toEqual({
      foo: [
        { bar: 'initial' },
        { bar: 'second' },
      ],
    });
  });

  test('should create object structure if array exists but needs new properties', () => {
    const starterObject = { foo: [] };
    const dynObj = new DynamicObject(starterObject);
    dynObj.set('foo:array.bar:string', 'new-bar');
    const result = dynObj.getObject();
    expect(result).toEqual({
      foo: [
        { bar: 'new-bar' },
      ],
    });
  });

  test('should push value directly when remainingPath is empty', () => {
    const dynObj = new DynamicObject();
    dynObj.set('foo:array', 'bar');
    const result = dynObj.getObject();
    expect(result).toEqual({ foo: ['bar'] });
  });
});
