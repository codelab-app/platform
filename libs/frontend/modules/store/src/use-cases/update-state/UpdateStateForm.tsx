import {
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { InterfaceType, PropsForm } from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { IPropData, IStore } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'

export const UpdateStateForm = observer<
  WithServices<STORE_SERVICE | TYPE_SERVICE> & { store: IStore }
>(({ storeService, typeService, store }) => {
  const initialPropsRef = useRef(store.state.values ?? {})

  const [getInterfaceType, { data, isLoading }] = useStatefulExecutor(
    (id: string) => typeService.getInterfaceAndDescendants(id),
  )

  useEffect(() => {
    if (store?.stateApi?.id) {
      getInterfaceType(store.stateApi.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (state: IPropData) => {
    if (!store) {
      throw new Error('Updated store is not set')
    }

    return storeService.update(store, {
      name: store?.name,
      state: JSON.stringify(state),
    })
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating store',
  })

  return (
    <Spinner isLoading={isLoading}>
      <DisplayIf condition={Boolean(data)}>
        <Card>
          <PropsForm
            autosave
            context={{
              autocomplete: {},
              builderState: { componentId: undefined },
            }}
            initialValue={initialPropsRef.current || {}}
            interfaceType={data as InterfaceType}
            key={store?.id}
            onSubmit={onSubmit}
          />
        </Card>
      </DisplayIf>
    </Spinner>
  )
})
