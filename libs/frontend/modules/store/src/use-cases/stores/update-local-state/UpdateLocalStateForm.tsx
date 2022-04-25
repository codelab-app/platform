import {
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { InterfaceForm, InterfaceType } from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { IPropData } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useCurrentStore } from '../../../hooks'

export const UpdateInitialStateForm = observer<
  WithServices<STORE_SERVICE | TYPE_SERVICE>
>(({ storeService, typeService }) => {
  const { store } = useCurrentStore(storeService)

  const [getInterfaceType, { data, isLoading }] = useLoadingState(
    (id: string) => typeService.getInterfaceAndDescendants(id),
  )

  useEffect(() => {
    if (store?.state?.id) {
      getInterfaceType(store.state.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (localState: IPropData) => {
    if (!store) {
      throw new Error('Updated store is not set')
    }

    return storeService.update(store, {
      name: store?.name,
      parentStore: {
        id: store.parentStore?.id as string,
        key: store.storeKey as string,
      },
      localState: JSON.stringify(localState),
    })
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating store',
  })

  return (
    <Spinner isLoading={isLoading}>
      <DisplayIf condition={Boolean(data)}>
        <Card>
          <InterfaceForm
            autosave
            interfaceType={data as InterfaceType}
            key={store?.id}
            model={store?.localState || {}}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            submitRef={undefined}
          />
        </Card>
      </DisplayIf>
    </Spinner>
  )
})
