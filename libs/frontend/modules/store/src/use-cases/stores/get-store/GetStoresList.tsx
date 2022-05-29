import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { IStore } from '@codelab/shared/abstract/core'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StoreListItem } from './StoreListItem'

export const GetStoresList = observer<WithServices<STORE_SERVICE>>(
  ({ storeService }) => {
    const [getStores, { isLoading }] = useStatefulExecutor(() =>
      storeService.getAll(),
    )

    useEffect(() => {
      getStores()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const storesList: Array<IStore> = storeService.storesList

    return (
      <Spinner isLoading={isLoading}>
        <List
          dataSource={storesList}
          renderItem={(store) => (
            <StoreListItem store={store} storeService={storeService} />
          )}
          size="small"
        />
      </Spinner>
    )
  },
)
