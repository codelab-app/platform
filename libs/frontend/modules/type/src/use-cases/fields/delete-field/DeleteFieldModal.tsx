import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  Form,
  FormModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { useDeleteFieldForm } from './useDeleteFieldForm'

type DeleteFieldModalProps = {
  interfaceId: string
}

export const DeleteFieldModal = ({ interfaceId }: DeleteFieldModalProps) => {
  const {
    isLoading,
    actionType,
    onSubmit,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
  } = useDeleteFieldForm(interfaceId)

  return (
    <FormModal
      className="delete-field-modal"
      okButtonProps={{
        loading: isLoading,
        danger: true,
      }}
      okText="Delete"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete field</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={emptyJsonSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete field "{entity?.name}"?</h4>
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}

DeleteFieldModal.displayName = 'DeleteFieldModal'
