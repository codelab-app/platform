import {
  InterfaceForm,
  InterfaceType,
  WithTypeService,
} from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { PropsData } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useCurrentStore } from '../../../hooks'
import { WithStoreService } from '../../../store'

export const UpdateInitialStateForm = observer<
  WithStoreService & WithTypeService
>(({ storeService, typeService }) => {
  const { store } = useCurrentStore(storeService)

  const [getInterfaceType, { data, isLoading }] = useLoadingState(
    (id: string) => typeService.getInterfaceAndDescendants({ id }),
  )

  useEffect(() => {
    if (store?.stateId) {
      getInterfaceType(store?.stateId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (initialState: PropsData) => {
    if (!store) {
      throw new Error('Updated store is not set')
    }

    return storeService.updateStore(store, {
      name: store?.name,
      parentStore: { id: store.parentStore?.id as string, key: store.storeKey },
      initialState: JSON.stringify(initialState),
    })
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating store',
  })

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <ConditionalView condition={Boolean(data)}>
        <Card>
          <InterfaceForm
            autosave
            interfaceType={data as InterfaceType}
            key={store?.id}
            model={JSON.parse(store?.initialState || '{}')}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            submitRef={undefined}
          />
        </Card>
      </ConditionalView>
    </SpinnerWrapper>
  )
})

/**
 * 
 *  <Form
        autosave
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        schema={updateStoreSchema}
      >
        <AutoFields omitFields={['name', 'parentStore']} />
    </Form>

 */
