import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { List } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { GetResourcesItem } from './GetResourceItem'

export const GetResourcesList = observer<WithServices<RESOURCE_SERVICE>>(
  ({ resourceService }) => {
    const [getResources, { isLoading }] = useStatefulExecutor(() =>
      resourceService.getAll(),
    )

    useEffect(() => {
      getResources()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Spinner isLoading={isLoading}>
        <List
          dataSource={resourceService.resourceList}
          renderItem={(resource) => (
            <GetResourcesItem
              key={resource.id}
              resource={resource}
              resourceService={resourceService}
            />
          )}
          size="small"
        />
      </Spinner>
    )
  },
)
