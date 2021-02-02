import 'reflect-metadata'

export const reflectClassDecorator = (
  metadataKey: string,
  metadataValue: any,
): ClassDecorator => (ctorPrototype: any): void =>
  Reflect.defineMetadata(`data:${metadataKey}`, metadataValue, ctorPrototype)

export const getReflectClassDecorator = (ctor: {}, metadataKey: string): any =>
  Reflect.getMetadata(`data:${metadataKey}`, ctor) || {}
