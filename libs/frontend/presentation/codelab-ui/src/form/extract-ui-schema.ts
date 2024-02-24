/* eslint-disable @typescript-eslint/no-explicit-any */
import set from 'lodash/set'

export const extractUiSchema = (
  jsonSchema: any,
  path = '',
): Record<string, any> => {
  const uiSchema: Record<string, any> = {}

  const traverseSchema = (currentSchema: any, currentPath: string) => {
    // Handle properties
    if (currentSchema.type === 'object' && currentSchema.properties) {
      Object.keys(currentSchema.properties).forEach((key) => {
        const property = currentSchema.properties[key]
        const propertyPath = currentPath ? `${currentPath}.${key}` : key

        if (property['ui:widget']) {
          set(uiSchema, propertyPath, { 'ui:widget': property['ui:widget'] })
        }

        // Recursively traverse nested objects
        if (property.type === 'object') {
          traverseSchema(property, propertyPath)
        }
      })
    }

    // Handle oneOf, anyOf, and dependencies
    const keysToHandle = ['oneOf', 'anyOf', 'dependencies']

    keysToHandle.forEach((key) => {
      if (currentSchema[key]) {
        if (Array.isArray(currentSchema[key])) {
          // For oneOf and anyOf, which are arrays
          currentSchema[key].forEach((nestedSchema: any) => {
            traverseSchema(nestedSchema, currentPath)
          })
        } else if (typeof currentSchema[key] === 'object') {
          // For dependencies, which is an object
          Object.values(currentSchema[key]).forEach((dependentSchema: any) => {
            if (dependentSchema.oneOf) {
              dependentSchema.oneOf.forEach((nestedSchema: any) => {
                traverseSchema(nestedSchema, currentPath)
              })
            }
          })
        }
      }
    })
  }

  traverseSchema(jsonSchema, path)

  return uiSchema
}
