'use client'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { resetDatabaseAction } from './ResetData.action'

export const ResetDataButtons = () => {
  const router = useRouter()
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

          return resetDatabaseAction()
            .then(onSuccess)
            .catch(onError)
            .then(() => router.push('/api/auth/logout'))
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
