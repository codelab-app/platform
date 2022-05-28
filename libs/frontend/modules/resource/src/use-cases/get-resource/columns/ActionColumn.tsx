import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IResource, IResourceService } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { resourceRef } from '../../../store'

type ActionColumnProps = {
  resourceService: IResourceService
  resource: IResource
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ resource, resourceService }) => {
    return (
      <Space size="middle">
        <ListItemEditButton
          onClick={() =>
            resourceService.updateModal.open(resourceRef(resource.id))
          }
        />
        <ListItemDeleteButton
          onClick={() =>
            resourceService.deleteModal.open(resourceRef(resource.id))
          }
        />
      </Space>
    )
  },
)
