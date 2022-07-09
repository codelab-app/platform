import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IResource } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface GetResourceItemProps extends WithServices<RESOURCE_SERVICE> {
  resource: IResource
}

export const GetResourcesItem = observer<GetResourceItemProps>(
  // eslint-disable-next-line react/jsx-no-useless-fragment
  ({ resourceService, resource }) => <>{resource.name}</>,
)
