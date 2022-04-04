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
import { useRemoveHookFromElementForm } from './useRemoveHookFromElementForm'

export interface RemoveHookFromElementModalProps {
  elementId: string
}

export const RemoveHookFromElementModal = ({
  elementId,
}: RemoveHookFromElementModalProps) => {
  const {
    onSubmit,
    onSubmitSuccess,
    actionType,
    onSubmitError,
    isLoading,
    model,
    reset,
    entity,
  } = useRemoveHookFromElementForm(elementId)

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Remove"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Remove hook</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<EmptyJsonSchemaType>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={emptyJsonSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to remove the hook "{entity?.type}"</h4>
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
