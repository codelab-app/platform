import { Resource, resourceRef } from '@codelab/frontend/modules/resource'
import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithStoreResourceService } from '../../../../store'

type ActionColumnProps = WithStoreResourceService & {
  resource: Resource
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ storeResourceService, resource }) => {
    const onClickDelete = () =>
      storeResourceService.deleteModal.open(resourceRef(resource.id))

    return (
      <Space size="middle">
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
