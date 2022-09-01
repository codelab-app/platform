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

interface StateFormProps {
  typeService: ITypeService
  storeService: IStoreService
  appStore: IStore
}

export const StateForm = observer<StateFormProps>(
  ({ storeService, typeService, appStore }) => {
    const api = typeService.type(appStore.stateApiId) as IInterfaceType

    const onSubmit = (values: IPropData) => {
      const promise = storeService.update(appStore, {
        state: JSON.stringify(values),
        name: appStore.name,
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
            interfaceType={api}
            model={api.defaults}
            onSubmit={onSubmit}
          />
        </div>
      </ErrorBoundary>
    )
  },
)
