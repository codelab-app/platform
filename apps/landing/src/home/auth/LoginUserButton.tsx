import { Button } from 'antd'
import { useAuthUrl } from './use-auth-url'

export const LoginUserButton = () => {
  const { loginUrl } = useAuthUrl()
  
  return (
    <Button
      className={`
        rounded-2xl !text-purple-500
        hover:!bg-purple-400 hover:!text-white
      `}
      ghost
      href={loginUrl}
      type="primary"
    >
      Login
    </Button>
  )
}
