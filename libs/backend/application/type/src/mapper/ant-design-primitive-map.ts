import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'

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
      return IPrimitiveTypeKind.Number
    case 'integer':
      return IPrimitiveTypeKind.Integer
    default:
      console.log(`Type not found: [${value}]`)

      return null
  }
}
