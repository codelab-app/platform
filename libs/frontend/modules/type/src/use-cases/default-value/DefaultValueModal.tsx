import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IInterfaceType,
  IPropData,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ModalPropsForm } from '../../props-form/ModalPropsForm'

export interface DefaultValueModalProps {
  typeService: ITypeService
  type: IInterfaceType
}

export const DefaultValueModal = observer<DefaultValueModalProps>(
  ({ typeService, type }) => {
    const closeModal = () => typeService.defaultValueModal.close()

    const onSubmit = (defaultValue: IPropData) =>
      typeService.update(type, {
        id: type.id,
        kind: type.kind,
        name: type.name,
        defaultValue,
      })

    return (
      <ModalForm.Modal
        className="create-default-value-modal"
        okText="Save"
        onCancel={closeModal}
        visible={typeService.defaultValueModal.isOpen}
      >
        <ModalPropsForm
          interfaceType={type}
          key={type.id}
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          setIsLoading={() => false}
        />
      </ModalForm.Modal>
    )
  },
)
