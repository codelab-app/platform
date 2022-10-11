import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'

export const allPrimitives = ['number', 'string', 'boolean']

// Function to check PrimitiveType of value
export const mapPrimitiveType = (value: string) => {
  switch (value) {
    case 'boolean':
      return IPrimitiveTypeKind.Boolean
    case 'string':
      return IPrimitiveTypeKind.String
    case 'ReactNode':
      return ITypeKind.ReactNodeType
    case 'number':
      return IPrimitiveTypeKind.Float
    case 'integer':
      return IPrimitiveTypeKind.Integer
    default:
      console.log(`Type not found: [${value}]`)

      return null
  }
}
