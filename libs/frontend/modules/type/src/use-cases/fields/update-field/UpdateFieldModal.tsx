import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { InterfaceType, TypeStore, UpdateFieldInput } from '../../../store'
import { createFieldSchema } from '../create-field'

export type UpdateFieldModalProps = {
  interfaceType: InterfaceType
  typeStore: TypeStore
}

export const UpdateFieldModal = observer<UpdateFieldModalProps>(
  ({ interfaceType, typeStore }) => {
    const closeModal = () => typeStore.fieldUpdateModal.close()
    const field = typeStore.fieldUpdateModal.field

    if (!field) {
      return null
    }

    const model = {
      name: field.name,
      key: field.key,
      existingTypeId: field.type.id ?? '',
      description: field.description,
    }

    return (
      <ModalForm.Modal
        className="update-field-modal"
        okText="Update"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Update field</span>}
        visible={typeStore.fieldUpdateModal.isOpen}
      >
        <ModalForm.Form<UpdateFieldInput>
          model={model}
          onSubmit={(input) =>
            typeStore.updateField(interfaceType, field.key, input)
          }
          onSubmitError={createNotificationHandler({
            title: 'Error while updating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields fields={['key', 'name', 'description']} />
          <TypeSelect
            label="Type"
            name="existingTypeId"
            typeStore={typeStore}
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
