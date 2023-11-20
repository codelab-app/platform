import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IReactNodeTypeDTO } from './react-node-type.dto.interface'

export const reactNodeTypeSchema: JSONSchemaType<IReactNodeTypeDTO> =
  baseTypeSchema(ITypeKind.ReactNodeType)
