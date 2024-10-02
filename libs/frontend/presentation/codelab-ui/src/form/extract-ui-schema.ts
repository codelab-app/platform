/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ObjectLike } from '@codelab/shared/abstract/types'

import { pipe, setPath, stringToPath } from 'remeda'

export const extractUiSchema = (jsonSchema: any, path = ''): ObjectLike => {
  let uiSchema: ObjectLike = {}

  const traverseSchema = (currentSchema: any, currentPath: string) => {
    if (currentSchema.properties) {
      Object.entries(currentSchema.properties).forEach(
        ([key, property]: [string, any]) => {
          const propertyPath = currentPath ? `${currentPath}.${key}` : key

          if (property['ui:widget']) {
            uiSchema = pipe(uiSchema, (schema) =>
              setPath(schema, stringToPath(propertyPath) as any, {
                'ui:widget': property['ui:widget'],
              }),
            )
          }

          if (typeof property === 'object') {
            traverseSchema(property, propertyPath)
          }
        },
      )
    }

    const keysToHandle = ['oneOf', 'anyOf', 'dependencies']

    keysToHandle.forEach((key) => {
      if (Array.isArray(currentSchema[key])) {
        currentSchema[key].forEach((nestedSchema: any) => {
          traverseSchema(nestedSchema, currentPath)
        })
      }
    })

    if (currentSchema.dependencies) {
      Object.values(currentSchema.dependencies).forEach((dependency: any) => {
        if (dependency.oneOf) {
          dependency.oneOf.forEach((nestedSchema: any) => {
            traverseSchema(nestedSchema, currentPath)
          })
        }
      })
    }
  }

  traverseSchema(jsonSchema, path)

  return uiSchema
}
