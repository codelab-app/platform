import type { IRedirectModel } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Button, Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useRedirectService } from '../../services/redirect.service'

export const DeleteRedirectButton = observer<{
  redirect?: IRedirectModel
}>(({ redirect }) => {
  const redirectService = useRedirectService()
  const router = useRouter()

  if (!redirect) {
    return null
  }

  const onConfirm = () =>
    redirectService
      .removeMany([redirect])
      .then(() => redirectService.updatePopover.close(router))

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
