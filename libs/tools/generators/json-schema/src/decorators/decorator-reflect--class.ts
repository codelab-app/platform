import 'reflect-metadata'

export const getMetadataKey = (key: string) => `data:${key}`

export const reflectClassDecorator = (
  metadataKey: string,
  metadataValue: any,
): ClassDecorator => (ctorPrototype: any): void =>
  Reflect.defineMetadata(
    getMetadataKey(metadataKey),
    metadataValue,
    ctorPrototype,
  )

export const getReflectClassDecorator = (ctor: {}, metadataKey: string): any =>
  Reflect.getMetadata(getMetadataKey(metadataKey), ctor) || {}
