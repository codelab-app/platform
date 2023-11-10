import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IInterfaceTypeDTO } from './interface-type.dto.interface'

export const interfaceTypeSchema: JSONSchemaType<IInterfaceTypeDTO> =
  baseTypeSchema(ITypeKind.InterfaceType)
