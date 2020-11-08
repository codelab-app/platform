declare module 'object-mapper' {
  export = objectMapper;

  declare function objectMapper<T>(srcObject: object, mapObject: object): T;

  declare namespace objectMapper {
    export function merge(srcObject: object, mapObject: object): object;
    export function merge<T>(srcObject: object, destinationObject: T, mapObject: object): T;
    export function getKeyValue(sourceObject: object, key: string);
    export function setKeyValue(destinationObject: object, key: string, value: any);
  }
}