import { UserOutlined } from '@ant-design/icons'
import { UserProfile } from '@auth0/nextjs-auth0'
import {
  LoginUserButton,
  RegisterUserButton,
  SignOutUserButton,
} from '@codelab/frontend/modules/user'
import { disableMenuHoverEffects } from '@codelab/frontend/view/style'
import { MenuProps } from 'antd'
import React from 'react'

type UserMenuItemProps = {
  user: UserProfile | undefined
}

export const authenticatedUserMenuItems = ({
  user,
}: UserMenuItemProps): MenuProps['items'] => [
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
        key: 0,
        title: `Email ${user?.email}`,
      },
    ],
  },
]

export const guestUserMenu: MenuProps['items'] = [
  {
    icon: <RegisterUserButton />,
    key: 'register-user',
    style: {
      order: 6,
      ...disableMenuHoverEffects,
    },
  },
  {
    icon: <LoginUserButton />,
    key: 'login-user',
    style: {
      order: 5,
      ...disableMenuHoverEffects,
    },
  },
]
