import type { ButtonProps } from 'antd'

import { Button } from 'antd'

export const signOutHref = '/auth/logout'

export const SignOutUserButton = ({ type = 'primary' }: ButtonProps) => {
  return (
    <Button href={signOutHref} type={type}>
      Sign Out
    </Button>
  )
}
