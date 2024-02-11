import type { JSONSchemaType } from 'ajv'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IInterfaceTypeDto } from './interface-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const interfaceTypeSchema: JSONSchemaType<IInterfaceTypeDto> =
  baseTypeSchema(ITypeKind.InterfaceType)
