'use client'

import type { IAtomCreateRoute } from '@codelab/frontend-abstract-application'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'
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
