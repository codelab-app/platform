import { InboxOutlined } from '@ant-design/icons'
import {
  FormUniforms,
  FormUniformsProps,
  UploadField,
} from '@codelab/frontend/view/components'
import React from 'react'
import { createAppSchema, ImportAppSchema } from './importAppSchema'
import { validateFile } from './validateFile'

export type ImportAppFormProps = Omit<
  FormUniformsProps<ImportAppSchema>,
  'schema'
>

export const ImportAppForm = (props: ImportAppFormProps) => {
  return (
    <FormUniforms<ImportAppSchema> schema={createAppSchema as any} {...props}>
      <UploadField
        name="file"
        multiple={false}
        maxCount={1}
        beforeUpload={validateFile}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Supported format: json
        </p>
      </UploadField>
    </FormUniforms>
  )
}
