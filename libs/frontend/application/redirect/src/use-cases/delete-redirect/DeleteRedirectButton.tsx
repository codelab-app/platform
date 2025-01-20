'use client'

import type { IRedirectModel } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { Button, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useRedirectService } from '../../services/redirect.service'

export const DeleteRedirectButton = observer<{
  redirect?: IRedirectModel
}>(({ redirect }) => {
  const { appId, pageId } = useUrlPathParams()
  const redirectService = useRedirectService()
  const router = useRouter()

  if (!redirect) {
    return null
  }

  const onConfirm = () =>
    redirectService
      .removeMany([redirect])
      .then(() =>
        redirectService.updatePopover.close(router, { appId, pageId }),
      )

  return (
    <Popconfirm
      okText="Delete"
      onConfirm={onConfirm}
      placement="rightBottom"
      title="Are you sure you want to delete redirect?"
    >
      <Button danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  )
})
