import { JSONSchemaType } from 'ajv'
import type { UploadFile } from 'antd/lib/upload/interface'

export interface ImportAppSchema {
  file: UploadFile
}

export const importAppSchema = {
  title: 'Import App Input',
  type: 'object',
  properties: {
    file: {
      type: 'object',
    },
  },
  required: ['file'],
}
