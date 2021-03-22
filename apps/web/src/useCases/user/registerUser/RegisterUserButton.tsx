import { Button } from 'antd'
import React from 'react'

export const RegisterUserButton = () => {
  // const [state, setState] = useRecoilState(userState)
  // const router = useRouter()
  //
  // const isAuthenticated = !!state.currentUser
  //
  // const register = () =>
  //   isAuthenticated
  //     ? router.push(Page.APP_LIST.url)
  //     : setState({ ...state, modalVisible: 'register' })

  // TODO link directly to signup form
  return (
    <Button type="primary" href="/api/auth/login">
      Register
    </Button>
  )
}
