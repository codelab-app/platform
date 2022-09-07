import { InterfaceType, PropsForm } from '@codelab/frontend/modules/type'
import {
  IPropData,
  IStore,
  IStoreService,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

interface StoreConfigPaneProps {
  typeService: ITypeService
  storeService: IStoreService
  store: IStore
}

export const StoreConfigPane = observer<StoreConfigPaneProps>(
  ({ typeService, storeService, store }) => {
    const api = typeService.type(store.stateApiId) as InterfaceType

    const onSubmit = (values: IPropData) => {
      const promise = storeService.update(store, {
        state: JSON.stringify(values),
        name: store.name,
      })

      return promise
    }

    return (
      <div css={tw`p-4`}>
        <PropsForm
          autosave
          context={{
            builderState: { componentId: undefined },
          }}
          initialValue={store.state.values}
          interfaceType={api}
          onSubmit={onSubmit}
        />
      </div>
    )
  },
)
