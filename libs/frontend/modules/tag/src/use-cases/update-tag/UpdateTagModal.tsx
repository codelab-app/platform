import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { UpdateTagInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { updateTagSchema } from './updateTagSchema'
import { useUpdateTagForm } from './useUpdateTagForm'

export const UpdateTagModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    onSubmitError,
    isLoading,
    reset,
    model,
    actionType,
  } = useUpdateTagForm()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Update Tag"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Update Tag</span>}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<UpdateTagInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateTagSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
