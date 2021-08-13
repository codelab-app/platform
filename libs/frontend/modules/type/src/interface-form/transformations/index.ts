import { ITypeTree } from '@codelab/shared/graph'
import {
  InterfaceToJsonSchemaTransformer,
  InterfaceToJsonSchemaTransformerOptions,
} from './InterfaceToJsonSchemaTransformer'

export * from './InterfaceToJsonSchemaTransformer'

// Functions for easier access:

export const interfaceToJsonSchema = (
  typeTree: ITypeTree,
  options?: InterfaceToJsonSchemaTransformerOptions,
) => {
  return new InterfaceToJsonSchemaTransformer(typeTree, options).transform()
}
