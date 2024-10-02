import type { JSONSchemaType } from 'ajv'

import type { IInterfaceTypeDto } from './interface-type.dto.interface'

import { baseTypeSchema } from './base-type.schema.interface'
import { ITypeKind } from './type-kind.enum'

export const interfaceTypeSchema: JSONSchemaType<IInterfaceTypeDto> =
  baseTypeSchema(ITypeKind.InterfaceType) as JSONSchemaType<IInterfaceTypeDto>
