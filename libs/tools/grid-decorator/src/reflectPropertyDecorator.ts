import 'reflect-metadata'

export const reflectPropertyDecorator = (
  metadataKey: string,
  metadataValue: any,
): PropertyDecorator => {
  return (ctorPrototype: any, propertyKey: string | symbol): void => {
    // original functionality
    Reflect.defineMetadata(
      `data:${metadataKey}`,
      metadataValue,
      ctorPrototype,
      propertyKey,
    )

    // new functionality
    const propertyKeys =
      Reflect.getOwnMetadata(`keys:${metadataKey}`, ctorPrototype) ||
      (Reflect.getMetadata(`keys:${metadataKey}`, ctorPrototype) || []).slice(0)

    Reflect.defineMetadata(`keys:${metadataKey}`, propertyKeys, ctorPrototype)

    // record new property key
    propertyKeys.push(propertyKey)
  }
}

const getReflectPropertyDecorator = (
  ctor: { prototype: any },
  metadataKey: string,
  propertyKey: string | symbol,
): any => {
  return Reflect.getMetadata(`data:${metadataKey}`, ctor.prototype, propertyKey)
}

const getReflectDecoratorPropertyKeys = (
  ctor: { prototype: any },
  metadataKey: string,
) => {
  return (Reflect.getMetadata(`keys:${metadataKey}`, ctor.prototype) ||
    []) as Array<string>
}

export const getReflectPropertyDecorators = (
  ctor: { prototype: any },
  metadataKey: string,
): Record<string, any> => {
  const ret: Record<string, any> = {}

  for (const propertyKey of getReflectDecoratorPropertyKeys(
    ctor,
    metadataKey,
  )) {
    ret[propertyKey] = {
      [metadataKey]: getReflectPropertyDecorator(
        ctor,
        metadataKey,
        propertyKey,
      ),
    }
  }

  return ret
}
