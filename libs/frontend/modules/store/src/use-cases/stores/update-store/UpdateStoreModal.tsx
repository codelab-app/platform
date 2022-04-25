import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateStoreDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { DisplayIfParent } from '../create-store/DisplayIfParent'
import { updateStoreSchema } from './updateStoreSchema'

export const UpdateStoreModal = observer<WithServices<STORE_SERVICE>>(
  ({ storeService }) => {
    const closeModal = () => storeService.updateModal.close()
    const updateStore = storeService.updateModal.store

    const onSubmit = async (data: IUpdateStoreDTO) => {
      if (!updateStore) {
        throw new Error('Updated store is not set')
      }

      return storeService.update(updateStore, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating store',
    })

    const model = {
      name: updateStore?.name,
      parentStore: updateStore?.parentStore
        ? {
            id: updateStore.parentStore.id,
            key: updateStore.storeKey as string,
          }
        : undefined,
    }

    return (
      <ModalForm.Modal
        okText="Update Store"
        onCancel={closeModal}
        visible={storeService.updateModal.isOpen}
      >
        <ModalForm.Form<IUpdateStoreDTO>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateStoreSchema}
        >
          <AutoFields omitFields={['parentStore', 'localState']} />
          <AutoField
            name="parentStore.id"
            where={{ id_NOT: updateStore?.id }}
          />
          <DisplayIfParent>
            <AutoField name="parentStore.key" />
          </DisplayIfParent>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
