import { PropsForm } from '@codelab/frontend/modules/type'
import { ErrorBoundary } from '@codelab/frontend/view/components'
import {
  IInterfaceType,
  IPropData,
  IStore,
  IStoreService,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

interface StoreConfigPaneProps {
  typeService: ITypeService
  storeService: IStoreService
  store?: IStore
}

export const StoreConfigPane = observer<StoreConfigPaneProps>(
  ({ typeService, storeService, store }) => {
    if (!store) {
      return null
    }

    const api = typeService.type(store.stateApiId)

    console.log(api)

    const onSubmit = (values: IPropData) => {
      const promise = storeService.update(store, {
        state: JSON.stringify(values),
        name: store.name,
      })

      return promise
    }

    return (
      <ErrorBoundary>
        <div css={tw`p-4`}>
          <PropsForm
            autoSave
            context={{
              builderState: { componentId: undefined },
            }}
            initialValue={store.state.values}
            interfaceType={api as Maybe<IInterfaceType>}
            onSubmit={onSubmit}
          />
        </div>
      </ErrorBoundary>
    )
  },
)
