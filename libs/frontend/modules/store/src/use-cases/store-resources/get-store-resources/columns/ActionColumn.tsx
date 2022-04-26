import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { resourceRef } from '@codelab/frontend/modules/resource'
import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { IResource } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'

type ActionColumnProps = WithServices<RESOURCE_SERVICE> & {
  resource: IResource
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ resourceService, resource }) => {
    const onClickDelete = () =>
      resourceService.deleteModal.open(resourceRef(resource.id))

    return (
      <Space size="middle">
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
