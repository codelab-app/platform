import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateFieldDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from '../create-field'

export type UpdateFieldModalProps = WithServices<TYPE_SERVICE>

export const UpdateFieldModal = observer<UpdateFieldModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.fieldUpdateModal.close()
    const field = typeService.fieldUpdateModal.field

    if (!field) {
      return null
    }

    const model = {
      id: field.id,
      name: field.name,
      key: field.key,
      fieldType: field.type.id ?? '',
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
        <ModalForm.Form<IUpdateFieldDTO>
          model={model}
          onSubmit={(input) =>
            typeService.updateField(
              typeService.fieldUpdateModal?.interface?.id as string,
              field.key,
              input,
            )
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
            name="fieldType"
            types={typeService.typesList}
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
