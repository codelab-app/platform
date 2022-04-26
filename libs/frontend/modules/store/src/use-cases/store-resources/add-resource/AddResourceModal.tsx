import {
  RESOURCE_SERVICE,
  STORE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IAddStoreResourceDTO, IStore } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { addResourceSchema } from './addResourceSchema'

type AddResourceModalProp = WithServices<RESOURCE_SERVICE | STORE_SERVICE> & {
  store: IStore
}

export const AddResourceModal = observer<AddResourceModalProp>(
  ({ resourceService, storeService, store }) => {
    const closeModal = () => resourceService.createModal.close()

    const onSubmit = (input: IAddStoreResourceDTO) => {
      return storeService.addResource(store, input)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating action',
    })

    return (
      <ModalForm.Modal
        okText="Add Resource"
        onCancel={closeModal}
        visible={resourceService.createModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={addResourceSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
