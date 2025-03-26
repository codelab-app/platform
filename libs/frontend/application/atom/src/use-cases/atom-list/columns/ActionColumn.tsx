import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend-presentation-view/components/button'
import { Space } from 'antd'
import { useRouter } from 'next/navigation'

import type { ActionColumnProps } from './types'

export const ActionColumn = ({ atom }: ActionColumnProps) => {
  const router = useRouter()

  return (
    <Space size="middle">
      <ListItemEditButton
        onClick={() => router.push(NewRoutePaths.Atom.update(atom))}
      />
      <ListItemDeleteButton
        onClick={() => router.push(NewRoutePaths.Atom.delete(atom))}
      />
    </Space>
  )
}
