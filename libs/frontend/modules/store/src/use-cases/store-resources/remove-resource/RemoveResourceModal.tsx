import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  Store,
  WithStoreResourceService,
  WithStoreService,
} from '../../../store'

type DeleteResourcesModalProps = WithStoreResourceService &
  WithStoreService & { store: Store }

export const RemoveResourceModal = observer<DeleteResourcesModalProps>(
  ({ storeResourceService, storeService, store }) => {
    const resource = storeResourceService.deleteModal.resource
    const closeModal = () => storeResourceService.deleteModal.close()

    const onSubmit = () => {
      if (!resource) {
        return Promise.reject('Resource not defined in RemoveResourceModal')
      }

      if (!store) {
        return Promise.reject('Store not defined in RemoveResourceModal')
      }

      return storeService.removeResource(store, resource.id)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting resource',
    })

    return (
      <ModalForm.Modal
        className="delete-resources-modal"
        okText="Delete Resource"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={storeResourceService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to remove resource "{resource?.name}"?</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
