import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import { WithStoreService } from '../store'
import {
  CreateStoreButton,
  CreateStoreModal,
  DeleteStoresModal,
  GetStoresTree,
  UpdateStoreModal,
} from '../use-cases'

export const StoreMainPane = observer<WithStoreService>(({ storeService }) => {
  return (
    <MainPaneTemplate
      header={<CreateStoreButton key={0} storeService={storeService} />}
      title="Stores"
    >
      <GetStoresTree storeService={storeService} />
      <CreateStoreModal storeService={storeService} />
      <UpdateStoreModal storeService={storeService} />
      <DeleteStoresModal storeService={storeService} />
    </MainPaneTemplate>
  )
})
