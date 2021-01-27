import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useUserMachine } from '../../store'
import { Page } from '@codelab/frontend'

export const LoginUserButton = () => {
  const user = useUserMachine()
  const router = useRouter()

  const isAuthenticated = !!user.state.value?.authenticated

  const login = () =>
    isAuthenticated ? router.push(Page.APP_LIST.url) : user.send('LOGIN')

  return <Button onClick={login}>Login</Button>
}
