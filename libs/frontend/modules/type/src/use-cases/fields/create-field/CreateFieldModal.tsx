import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { InterfaceType, TypeService, WithTypeService } from '../../../store'
import { CreateFieldData, createFieldSchema } from './createFieldSchema'

export type CreateFieldModalProps = {
  interfaceType: InterfaceType
} & WithTypeService

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ interfaceType, typeService }) => {
    const closeModal = () => typeService.fieldCreateModal.close()

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={typeService.fieldCreateModal.isOpen}
      >
        <ModalForm.Form<CreateFieldData>
          model={{}}
          onSubmit={(input) => typeService.addField(interfaceType, input)}
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
            typeService={typeService}
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
