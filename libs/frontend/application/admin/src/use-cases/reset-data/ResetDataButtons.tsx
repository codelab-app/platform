'use client'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { resetDatabaseUseCase } from './reset-data.use-case'

export const ResetDataButtons = () => {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const onError = useErrorNotify({
    description: '',
    title: 'Failed to reset Data',
  })

  const onSuccess = useSuccessNotify({
    description: '',
    title: 'Data has been reset successfully',
  })

  return (
    <>
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true)

          return resetDatabaseUseCase()
            .then(onSuccess)
            .catch(onError)
            .then(() => push('/api/auth/logout'))
        }}
      >
        Reset Database
      </Button>
      {/* <Button
        disabled={loading}
        onClick={() => {
          setLoading(true)

          return resetDatabaseExceptUserAction()
            .then(onSuccess)
            .catch(onError)
            .then(() => router.push('/api/auth/logout'))
      }}
      >
        Reset Database Except User
      </Button> */}
    </>
  )
}
