import { ApartmentOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IComponent } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { useRouter } from 'next/router'
import { useComponentDispatch } from '../../../../hooks'

export type ActionColumnProps = {
  component: IComponent
}

export const ActionColumn = ({ component }: ActionColumnProps) => {
  const router = useRouter()
  const { openDeleteModal, openUpdateModal } = useComponentDispatch()

  const onEdit = () => {
    openUpdateModal({ updateId: component.id, entity: component })
  }

  const onDelete = () => {
    openDeleteModal({ deleteIds: [component.id], entity: component })
  }

  const onBuilder = () => {
    router.push({
      pathname: PageType.ComponentDetail,
      query: { componentId: component.id },
    })
  }

  return (
    <Space size="middle">
      <ListItemButton icon={<ApartmentOutlined />} onClick={onBuilder} />
      <ListItemEditButton onClick={onEdit} />
      <ListItemDeleteButton onClick={onDelete} />
    </Space>
  )
}
