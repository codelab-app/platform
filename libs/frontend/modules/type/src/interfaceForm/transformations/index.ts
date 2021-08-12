import { TypeTree } from '../../typeTree'
import {
  InterfaceToJsonSchemaTransformer,
  InterfaceToJsonSchemaTransformerOptions,
} from './InterfaceToJsonSchemaTransformer'

export * from './InterfaceToJsonSchemaTransformer'

// Functions for easier access:

export const interfaceToJsonSchema = (
  typeTree: TypeTree,
  options?: InterfaceToJsonSchemaTransformerOptions,
) => {
  return new InterfaceToJsonSchemaTransformer(typeTree, options).transform()
}
