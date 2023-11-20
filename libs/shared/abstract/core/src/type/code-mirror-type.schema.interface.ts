import type { JSONSchemaType } from 'ajv'
import { ITypeKind } from '../type-kind.enum'
import { baseTypeSchema } from './base-type.schema.interface'
import type { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'

export const codeMirrorTypeSchema: JSONSchemaType<ICodeMirrorTypeDTO> =
  baseTypeSchema(ITypeKind.CodeMirrorType)
