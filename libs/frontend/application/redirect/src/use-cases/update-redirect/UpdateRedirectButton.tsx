import EditOutlined from '@ant-design/icons/EditOutlined'
import { type IRedirectModel } from '@codelab/frontend/abstract/domain'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useUpdateRedirectForm } from './update-redirect.state'

interface UpdateRedirectProps {
  disabled: boolean
  redirect: IRedirectModel
}

export const UpdateRedirectButton = observer<UpdateRedirectProps>(
  ({ disabled, redirect }) => {
    const updateRedirectForm = useUpdateRedirectForm()

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => updateRedirectForm.open(redirect)}
        size="small"
        type="primary"
      />
    )
  },
)
