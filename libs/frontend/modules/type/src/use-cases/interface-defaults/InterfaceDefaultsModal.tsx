import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IInterfaceType,
  IPropData,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ModalPropsForm } from '../../props-form/ModalPropsForm'

export interface InterfaceDefaultsModalProps {
  typeService: ITypeService
}

export const InterfaceDefaultsModal = observer<InterfaceDefaultsModalProps>(
  ({ typeService }) => {
    const closeModal = () => typeService.interfaceDefaultsModal.close()

    const type = typeService.interfaceDefaultsModal
      .type as Maybe<IInterfaceType>

    const onSubmit = (data: IPropData) => {
      if (!type) {
        throw new Error('InterfaceType is undefined')
      }

      return typeService.update(type, {
        id: type.id,
        kind: type.kind,
        name: type.name,
        interfaceDefaults: {
          data,
          auth0Id: type.ownerAuthId,
        },
      })
    }

    return (
      <ModalForm.Modal
        className="create-default-value-modal"
        okText="Save"
        onCancel={closeModal}
        visible={typeService.interfaceDefaultsModal.isOpen}
      >
        {type && (
          <ModalPropsForm
            interfaceType={type}
            key={type.id}
            model={type.defaults}
            onSubmit={onSubmit}
            onSubmitError={createNotificationHandler({
              title: 'Error while updating defaults',
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
