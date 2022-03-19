import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { StateStore, storeRef } from '../../../store'
import { StoreCellData } from './types'

export type ActionColumnProps = {
  store: StoreCellData
  stateStore: StateStore
}

export const ActionColumn = observer(
  ({ store, stateStore }: ActionColumnProps) => {
    const onClickEdit = () => stateStore.updateModal.open(storeRef(store.id))

    const onClickDelete = () =>
      stateStore.deleteModal.open([storeRef(store.id)])

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
