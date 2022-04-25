import { useLoadingState } from '@codelab/frontend/shared/utils'
import { List, Spinner } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { WithResourceService } from '../../../store'
import { GetResourcesItem } from './GetResourcesItem'

export const GetResourcesList = observer<WithResourceService>(
  ({ resourceService }) => {
    const [getResources, { isLoading }] = useLoadingState(() =>
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
