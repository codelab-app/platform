'use client'

import type { IAtomCreateRoute } from '@codelab/frontend-abstract-application'
import type {
  PaginationClientProps,
  TreeViewClientProps,
} from '@codelab/frontend-abstract-types'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'

export const CreateAtomButton = ({
  context,
}: {
  context: IAtomCreateRoute
}) => {
  const { createPopover } = useAtomService()
  const router = useRouter()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => createPopover.open(router, context)}
      type="primary"
    >
      Create
    </Button>
  )
}
