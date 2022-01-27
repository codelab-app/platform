import { InboxOutlined } from '@ant-design/icons'
import { ImportAppActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal, UploadField } from '@codelab/frontend/view/components'
import React from 'react'
import { ImportAppSchema, importAppSchema } from './importAppSchema'
import { useImportAppForm } from './useImportAppForm'
import { validateFile } from './validateFile'

export const ImportAppModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
  } = useImportAppForm()

  return (
    <FormModal
      bodyStyle={{
        paddingTop: '3rem',
      }}
      okButtonProps={{ loading: isLoading }}
      okText="Import App"
      onCancel={reset}
      visible={actionType === ImportAppActionType.Import}
    >
      {({ submitRef }) => (
        <Form<ImportAppSchema>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={importAppSchema as any}
          submitRef={submitRef}
        >
          <UploadField
            beforeUpload={validateFile}
            maxCount={1}
            multiple={false}
            name="file"
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
        </Form>
      )}
    </FormModal>
  )
}
