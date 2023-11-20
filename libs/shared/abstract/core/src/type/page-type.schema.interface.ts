import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IPageTypeDTO } from './page-type.dto.interface'

export const pageTypeSchema: JSONSchemaType<IPageTypeDTO> = baseTypeSchema(
  ITypeKind.PageType,
)
