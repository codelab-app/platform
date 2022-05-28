import {
  STORE_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateStoreDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createStoreSchema } from './createStoreSchema'
import { DisplayIfParent } from './DisplayIfParent'

export const CreateStoreModal = observer<
  WithServices<STORE_SERVICE | USER_SERVICE>
>(({ storeService, userService }) => {
  const closeModal = () => storeService.createModal.close()

  const onSubmit = (data: ICreateStoreDTO) => {
    return storeService.create([data])
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating store',
  })

  const selectedStore = storeService.createModal.store

  const model = {
    auth0Id: userService.user?.auth0Id,
    parentStore: selectedStore
      ? {
          id: selectedStore?.id,
          storeKey: selectedStore?.storeKey,
        }
      : undefined,
  }

  return (
    <ModalForm.Modal
      okText="Create Store"
      onCancel={closeModal}
      visible={storeService.createModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createStoreSchema}
      >
        <AutoFields omitFields={['parentStore', 'state']} />
        <AutoField name="parentStore.id" />
        <DisplayIfParent>
          <AutoField name="parentStore.key" />
        </DisplayIfParent>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
