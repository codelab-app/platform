import { InterfaceType, PropsForm } from '@codelab/frontend/modules/type'
import {
  IApp,
  IAppService,
  IPropData,
  IStoreService,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

interface StoreConfigPaneProps {
  storeService: IStoreService
  typeService: ITypeService
  appService: IAppService
  app: IApp
}

export const StoreConfigPane = observer<StoreConfigPaneProps>(
  ({ storeService, typeService, appService, app }) => {
    if (!app) {
      return null
    }

    const store = app.store.current
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
