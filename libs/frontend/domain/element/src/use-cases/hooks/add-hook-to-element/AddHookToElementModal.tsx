import { InterfaceForm } from '@codelab/frontend/domain/type'
import { ModalForm } from '@codelab/frontend/view/components'
import { IAtomService, ITypeService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { addHookToElementSchema } from './addHookToElementSchema'
import { useAddHookToElementForm } from './useAddHookToElementForm'

export interface AddHookToElementModalProps {
  elementId: string
  typeService: ITypeService
  atomService: IAtomService
}

export const AddHookToElementModal = observer<AddHookToElementModalProps>(
  ({ elementId, typeService, atomService }) => {
    // TODO: Refactor to use mobx
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
    } = useAddHookToElementForm(elementId, typeService, atomService)

    return (
      <ModalForm.Modal
        okButtonProps={{ loading: isLoading }}
        okText="Add hook"
        onCancel={reset}
        title={<span css={tw`font-semibold`}>Add hook to element</span>}
        visible={actionType === 'CREATE'}
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
