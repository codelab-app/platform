import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { IRenderPropTypeDTO } from './render-prop-type.dto.interface'

export const renderPropTypeSchema: JSONSchemaType<IRenderPropTypeDTO> =
  baseTypeSchema(ITypeKind.RenderPropType)
