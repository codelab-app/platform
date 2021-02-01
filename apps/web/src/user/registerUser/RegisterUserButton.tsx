import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../state'
import { Page } from '@codelab/frontend'

export const RegisterUserButton = () => {
  const [state, setState] = useRecoilState(userState)
  const router = useRouter()

  const isAuthenticated = !!state.currentUser

  const register = () =>
    isAuthenticated
      ? router.push(Page.APP_LIST.url)
      : setState({ ...state, modalVisible: 'register' })

  return (
    <Button type="primary" onClick={register}>
      Register
    </Button>
  )
}
