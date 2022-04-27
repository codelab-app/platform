import { useUser } from '@auth0/nextjs-auth0'
import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateStoreDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createStoreSchema } from './createStoreSchema'
import { DisplayIfParent } from './DisplayIfParent'

export const CreateStoreModal = observer<WithServices<STORE_SERVICE>>(
  ({ storeService }) => {
    const { user } = useUser()
    const closeModal = () => storeService.createModal.close()

    const onSubmit = (input: ICreateStoreDTO) => {
      if (!user?.sub) {
        throw new Error('missing user')
      }

      return storeService.create({ ...input, auth0Id: user?.sub })
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating store',
    })

    const selectedStore = storeService.createModal.store

    const model = {
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
          <AutoFields omitFields={['parentStore', 'localState']} />
          <AutoField name="parentStore.id" />
          <DisplayIfParent>
            <AutoField name="parentStore.key" />
          </DisplayIfParent>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
