import type { TLiteral } from '@sinclair/typebox'
import type { JSONSchemaType } from 'ajv'
import mergeWith from 'lodash/mergeWith'
import type { IBaseActionDto } from '../action'
import type { IBaseTypeDto } from './base-type.dto.interface'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IInterfaceTypeDto } from './interface-type.dto.interface'
import { ITypeKind } from './type-kind.enum'

export const interfaceTypeSchema: JSONSchemaType<IInterfaceTypeDto> =
  baseTypeSchema(ITypeKind.InterfaceType) as JSONSchemaType<IInterfaceTypeDto>
