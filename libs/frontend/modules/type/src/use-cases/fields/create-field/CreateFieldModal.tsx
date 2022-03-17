import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { CreateFieldInput, InterfaceType, TypeStore } from '../../../store'
import { createFieldSchema } from './createFieldSchema'

export interface CreateFieldModalProps {
  interfaceType: InterfaceType
  typeStore: TypeStore
}

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ interfaceType, typeStore }) => {
    const closeModal = () => typeStore.fieldCreateModal.close()

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={typeStore.fieldCreateModal.isOpen}
      >
        <ModalForm.Form<CreateFieldInput>
          model={{}}
          onSubmit={(input) => typeStore.addField(interfaceType, input)}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields omitFields={['existingTypeId', 'interfaceId']} />
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
