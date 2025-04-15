'use client'

import type { PageContextParams } from '@codelab/frontend-abstract-application'
import type { IRef } from '@codelab/shared-abstract-core'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { getUiDataKey, UiKey } from '@codelab/frontend-abstract-types'
import { Button, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useRedirectService } from '../../services/redirect.service'

export const DeleteRedirectButton = observer<{
  redirect?: IRef
  params: PageContextParams
}>(({ params, redirect }) => {
  const redirectService = useRedirectService()
  const router = useRouter()

  if (!redirect) {
    return null
  }

  const onConfirm = () =>
    redirectService
      .removeMany([redirect])
      .then(() => redirectService.updatePopover.close(router, params))

  return (
    <Popconfirm
      classNames={{ root: getUiDataKey(UiKey.RedirectPopconfirmDelete) }}
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
