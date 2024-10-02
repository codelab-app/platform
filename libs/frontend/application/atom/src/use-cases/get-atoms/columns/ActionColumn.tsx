import { PageType } from '@codelab/frontend/abstract/types'
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
        onClick={() => router.push(PageType.AtomUpdate(atom))}
      />
      <ListItemDeleteButton
        onClick={() => router.push(PageType.AtomDelete(atom))}
      />
    </Space>
  )
}
