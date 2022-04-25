import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IAddStoreResourceDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  Store,
  WithStoreResourceService,
  WithStoreService,
} from '../../../store'
import { addResourceSchema } from './addResourceSchema'

type AddResourceModalProp = WithStoreResourceService &
  WithStoreService & { store: Store }

export const AddResourceModal = observer<AddResourceModalProp>(
  ({ storeResourceService, storeService, store }) => {
    const closeModal = () => storeResourceService.createModal.close()

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
        visible={storeResourceService.createModal.isOpen}
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
