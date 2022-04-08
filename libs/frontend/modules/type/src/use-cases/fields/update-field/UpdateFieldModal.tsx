import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { InterfaceType, WithTypeService } from '../../../store'
import { createFieldSchema } from '../create-field'
import { UpdateFieldData } from './types'

export type UpdateFieldModalProps = {
  interfaceType: InterfaceType
} & WithTypeService

export const UpdateFieldModal = observer<UpdateFieldModalProps>(
  ({ interfaceType, typeService }) => {
    const closeModal = () => typeService.fieldUpdateModal.close()
    const field = typeService.fieldUpdateModal.field

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
        visible={typeService.fieldUpdateModal.isOpen}
      >
        <ModalForm.Form<UpdateFieldData>
          model={model}
          onSubmit={(input) =>
            typeService.updateField(interfaceType, field.key, input)
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
            typeService={typeService}
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
