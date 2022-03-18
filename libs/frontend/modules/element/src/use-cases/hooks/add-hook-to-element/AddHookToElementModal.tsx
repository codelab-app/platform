import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { InterfaceForm } from '@codelab/frontend/modules/type'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { addHookToElementSchema } from './addHookToElementSchema'
import { AddHookToElementModalProps } from './types'
import { useAddHookToElementForm } from './useAddHookToElementForm'

export const AddHookToElementModal = observer(
  ({ elementId, typeStore, atomStore }: AddHookToElementModalProps) => {
    const {
      onSubmitSuccess,
      onSubmit,
      onSubmitError,
      reset,
      actionType,
      interfaceType,
      isLoading,
      onChange,
      model,
    } = useAddHookToElementForm(elementId, typeStore, atomStore)

    return (
      <ModalForm.Modal
        okButtonProps={{ loading: isLoading }}
        okText="Add hook"
        onCancel={reset}
        title={<span css={tw`font-semibold`}>Add hook to element</span>}
        visible={actionType === CRUDActionType.Create}
      >
        {interfaceType && (
          <InterfaceForm
            initialSchema={addHookToElementSchema}
            interfaceType={interfaceType}
            model={model}
            onChange={onChange}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            onSubmitSuccess={onSubmitSuccess}
          >
            <AutoFields omitFields={['appId']} />
          </InterfaceForm>
        )}
      </ModalForm.Modal>
    )
  },
)
