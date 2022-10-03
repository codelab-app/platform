import { IUpdatePreRenderDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createPreRenderSchema } from '../create-pre-render'

export const updatePreRenderSchema: JSONSchemaType<IUpdatePreRenderDTO> =
  createPreRenderSchema
