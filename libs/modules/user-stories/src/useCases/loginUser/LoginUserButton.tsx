import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { APP_LIST_PAGE } from '../../../../../frontend/src/config/Router'
import { useUserMachine } from '../../store'

export const LoginUserButton = () => {
  const user = useUserMachine()
  const router = useRouter()

  const isAuthenticated = !!user.state.value?.authenticated

  const login = () =>
    isAuthenticated ? router.push(APP_LIST_PAGE.url) : user.send('LOGIN')

  return <Button onClick={login}>Login</Button>
}
