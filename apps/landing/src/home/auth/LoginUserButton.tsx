import { Button } from 'antd'

import { useAuthUrl } from './use-auth-url'

export const LoginUserButton = () => {
  const { loginUrl } = useAuthUrl()

  return (
    <Button
      className={`
        rounded-2xl
      `}
      href={loginUrl}
      type="primary"
    >
      Login
    </Button>
  )
}
