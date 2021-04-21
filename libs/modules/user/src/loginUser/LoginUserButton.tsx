import { Button } from 'antd'
import React from 'react'

export const LoginUserButton = () => {
  // const [state, setState] = useRecoilState(userState)
  //
  // const router = useRouter()
  //
  // const isAuthenticated = !!state.currentUser
  //
  // const openLoginModal = () =>
  //   isAuthenticated
  //     ? router.push(Page.APP_LIST.url)
  //     : setState({ ...state, modalVisible: 'login' })

  return (
    <Button className="login-button" type="link" href="/api/auth/login">
      Login
    </Button>
  )
}
