import {
  STORE_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import {
  CreateStoreButton,
  CreateStoreModal,
  DeleteStoresModal,
  GetStoresList,
  UpdateStoreModal,
} from '../use-cases'

export const StoreMainPane = observer<
  WithServices<STORE_SERVICE | USER_SERVICE>
>(({ storeService, userService }) => (
  <MainPaneTemplate
    header={<CreateStoreButton key={0} storeService={storeService} />}
    title="Stores"
  >
    <GetStoresList storeService={storeService} />
    <CreateStoreModal storeService={storeService} userService={userService} />
    <UpdateStoreModal storeService={storeService} />
    <DeleteStoresModal storeService={storeService} />
  </MainPaneTemplate>
))
