import { Button } from 'antd'

export const RegisterUserButton = () => {
  return (
    <Button className="!text-white" href="/api/auth/login" type="primary">
      Register
    </Button>
  )
}
