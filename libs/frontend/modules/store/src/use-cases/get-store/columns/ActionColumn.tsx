import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import { StateStore, storeRef } from '../../../store'

export type ActionColumnProps = {
  store: DataNode
  stateStore: StateStore
}

export const ActionColumn = observer(
  ({ store, stateStore }: ActionColumnProps) => {
    const onClickEdit = () =>
      stateStore.updateModal.open(storeRef(store.key as string))

    const onClickDelete = () =>
      stateStore.deleteModal.open([storeRef(store.key as string)])

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
