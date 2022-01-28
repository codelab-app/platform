import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { InterfaceForm } from '@codelab/frontend/modules/type'
import { FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { addHookToElementSchema } from './addHookToElementSchema'
import { AddHookToElementModalProps } from './types'
import { useAddHookToElementForm } from './useAddHookToElementForm'

export const AddHookToElementModal = ({
  elementId,
}: AddHookToElementModalProps) => {
  const {
    onSubmitSuccess,
    onSubmit,
    onSubmitError,
    reset,
    actionType,
    interfaceTree,
    isLoading,
    onChange,
    model,
  } = useAddHookToElementForm(elementId)

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Add hook"
      onCancel={reset}
      title={<span css={tw`font-semibold`}>Add hook to element</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <InterfaceForm
          interfaceTree={interfaceTree}
          model={model}
          onChange={onChange}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={addHookToElementSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['appId']} />
        </InterfaceForm>
      )}
    </FormModal>
  )
}
