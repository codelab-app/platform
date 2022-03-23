import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { modelIdPropertyNameSymbol } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import { atomRef } from '../../../store'
import { ActionColumnProps } from './types'

export const ActionColumn = observer<ActionColumnProps>(
  ({ atom, atomService }) => {
    const onClickEdit = () => {
      atomService.setSelectedAtoms([atomRef(atom.id)])
      atomService.updateModal.open()
    }

    const onClickDelete = () => {
      const atomRefs = Array.from(atomService.atoms.keys()).map((id) =>
        atomRef(id),
      )

      atomService.setSelectedAtoms(atomRefs)
      atomService.deleteModal.open()
    }

    return (
      <Space size="middle">
        <ListItemEditButton onClick={onClickEdit} />
        <ListItemDeleteButton onClick={onClickDelete} />
      </Space>
    )
  },
)
