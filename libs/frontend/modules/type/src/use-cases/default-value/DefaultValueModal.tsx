import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IPropData, ITypeService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ModalPropsForm } from '../../props-form/ModalPropsForm'

export interface DefaultValueModalProps {
  typeService: ITypeService
}

export const DefaultValueModal = observer<DefaultValueModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.defaultValueModal.close()
    const type = typeService.defaultValueModal.type

    const onSubmit = (defaultValue: IPropData) => {
      if (!type) {
        throw new Error('InterfaceType is undefined')
      }

      return typeService.update(type, {
        id: type.id,
        kind: type.kind,
        name: type.name,
        defaultValue,
      })
    }

    return (
      <ModalForm.Modal
        className="create-default-value-modal"
        okText="Save"
        onCancel={closeModal}
        visible={typeService.defaultValueModal.isOpen}
      >
        {type && (
          <ModalPropsForm
            interfaceType={type}
            key={type.id}
            model={type.defaultValue}
            onSubmit={onSubmit}
            onSubmitError={createNotificationHandler({
              title: 'Error while creating field',
              type: 'error',
            })}
            onSubmitSuccess={closeModal}
            setIsLoading={() => false}
          />
        )}
      </ModalForm.Modal>
    )
  },
)
