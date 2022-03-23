import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import React from 'next/router'
import { StateStore } from '../store'
import {
  CreateStoreButton,
  CreateStoreModal,
  DeleteStoresModal,
  GetStoresTree,
  UpdateStoreModal,
} from '../use-cases'

export interface StoreMainPaneProps {
  stateStore: StateStore
}

export const StoreMainPane = observer<StoreMainPaneProps>(({ stateStore }) => {
  return (
    <MainPaneTemplate
      header={<CreateStoreButton key={0} stateStore={stateStore} />}
      title="Stores"
    >
      <GetStoresTree stateStore={stateStore} />
      <CreateStoreModal stateStore={stateStore} />
      <UpdateStoreModal stateStore={stateStore} />
      <DeleteStoresModal stateStore={stateStore} />
    </MainPaneTemplate>
  )
})
