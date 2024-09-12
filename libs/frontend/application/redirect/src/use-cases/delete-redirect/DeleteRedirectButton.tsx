import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useDeleteRedirectModal } from './delete-redirect.state'

export const DeleteRedirectButton = observer<{
  redirect?: IRedirectModel
}>(({ redirect }) => {
  const deleteRedirectModal = useDeleteRedirectModal()

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={() => deleteRedirectModal.open(redirect)}
    >
      Delete
    </Button>
  )
})
