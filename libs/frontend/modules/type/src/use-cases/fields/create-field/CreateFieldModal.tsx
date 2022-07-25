import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateFieldDTO, ITypeService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { createFieldSchema } from './createFieldSchema'

export type CreateFieldModalProps = { typeService: ITypeService }

export const CreateFieldModal = observer<CreateFieldModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.fieldCreateModal.close()

    return (
      <ModalForm.Modal
        className="create-field-modal"
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create field</span>}
        visible={typeService.fieldCreateModal.isOpen}
      >
        <ModalForm.Form<ICreateFieldDTO>
          model={{
            id: v4(),
          }}
          onSubmit={(input) =>
            typeService.addField(
              typeService.fieldCreateModal?.interface?.id as string,
              input,
            )
          }
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields omitFields={['fieldType']} />
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
