import { PageType } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCurrentStoreId } from '../../../hooks'
import { WithStoreService } from '../../../store'

export const DeleteStoresModal = observer<WithStoreService>(
  ({ storeService }) => {
    const router = useRouter()
    const storeId = useCurrentStoreId()
    const store = storeService.deleteModal.store

    const onSubmitSuccess = () => {
      storeService.deleteModal.close()

      if (storeId === store?.id) {
        router.push({ pathname: PageType.Store, query: {} })
        storeService.setCurrentStore(null)
      }
    }

    const onSubmit = () => {
      if (!store) {
        throw new Error('Store to delete not found')
      }

      return storeService.deleteStoresSubgraph(store?.id)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting store',
    })

    return (
      <ModalForm.Modal
        className="delete-stores-modal"
        okText="Delete Store"
        onCancel={onSubmitSuccess}
        title="Delete Confirmation"
        visible={storeService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete stores "
            {storeService.deleteModal.store?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
