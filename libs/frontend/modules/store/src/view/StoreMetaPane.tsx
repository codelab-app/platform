import {
  APP_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { InterfaceType, PropsForm } from '@codelab/frontend/modules/type'
import { IPropData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { useCurrentStore } from '../hooks'

type StoreMetaPaneProps = WithServices<
  STORE_SERVICE | TYPE_SERVICE | APP_SERVICE
>

export const StoreMetaPane = observer<StoreMetaPaneProps>(
  ({ storeService, typeService, appService }) => {
    const { store } = useCurrentStore(appService, storeService)

    if (!store) {
      return null
    }

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
