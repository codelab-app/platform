import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { InterfaceType } from '../../../store'
import { createFieldSchema } from './createFieldSchema'

export type CreateFieldModalProps = {
  interfaceType: InterfaceType
} & WithServices<TYPE_SERVICE>

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
        <ModalForm.Form<ICreateFieldDTO>
          model={{
            id: v4(),
          }}
          onSubmit={(input) => typeService.addField(interfaceType.id, input)}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={createFieldSchema}
        >
          <AutoFields omitFields={['fieldType']} />
          <TypeSelect label="Type" name="fieldType" typeService={typeService} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
