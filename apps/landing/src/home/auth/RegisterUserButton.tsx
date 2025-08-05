import { Button } from 'antd'
import { useAuthUrl } from './use-auth-url'

export const RegisterUserButton = () => {
  const { loginUrl } = useAuthUrl()
  
  return (
    <Button className="!text-white" href={loginUrl} type="primary">
      Register
    </Button>
  )
}
