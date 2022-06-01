import { UserOutlined } from '@ant-design/icons'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { disableMenuHoverEffects } from '@codelab/frontend/view/style'
import { MenuProps } from 'antd'

export const authenticatedUserMenuItems = (): MenuProps['items'] => [
  {
    icon: <SignOutUserButton />,
    key: 'sign-out-user',
    style: { order: 6, ...disableMenuHoverEffects },
  },
  {
    icon: <UserOutlined />,
    key: 'user-profile',
    popupClassName: 'h-auto',
    style: { order: 5 },
    children: [
      {
        title: <>Email {user?.email}</>,
      },
    ],
  },
]
