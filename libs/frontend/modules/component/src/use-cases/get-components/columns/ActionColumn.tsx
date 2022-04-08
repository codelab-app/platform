import { ApartmentOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import {
  componentRef,
  ComponentService,
} from '../../../store/component.service'
import { ComponentColumnData } from './types'

export interface ActionColumnProps {
  component: ComponentColumnData
  componentStore: ComponentService
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ component, componentStore }) => {
    const router = useRouter()

    const onEdit = () => {
      componentStore.updateModal.open(componentRef(component.id))
    }

    const onDelete = () => {
      componentStore.deleteModal.open(componentRef(component.id))
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
  },
)
