import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../state'
import { Page } from '@codelab/frontend'

export const LoginUserButton = () => {
  const [state, setState] = useRecoilState(userState)

  const router = useRouter()

  const isAuthenticated = !!state.currentUser

  const openLoginModal = () =>
    isAuthenticated
      ? router.push(Page.APP_LIST.url)
      : setState({ ...state, modalVisible: 'login' })

  return <Button onClick={openLoginModal}>Login</Button>
}
