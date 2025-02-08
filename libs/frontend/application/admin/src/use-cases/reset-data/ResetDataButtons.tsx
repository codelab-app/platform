'use client'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/infra/context'
import { Button, Popconfirm } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { resetDatabaseService } from './reset-data.service'

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
    <Popconfirm
      description="This will fully delete all the users data as well as system types"
      disabled={loading}
      okText="Reset"
      onConfirm={() => {
        setLoading(true)

        return resetDatabaseService()
          .then(onSuccess)
          .catch(onError)
          .then(() => push('/auth/logout'))
      }}
      title="Are you sure you want to reset database?"
    >
      <Button disabled={loading}>Reset Database</Button>
      {/* <Button
        disabled={loading}
        onClick={() => {
          setLoading(true)

          return resetDatabaseExceptUserAction()
            .then(onSuccess)
            .catch(onError)
            .then(() => router.push('/auth/logout'))
      }}
      >
        Reset Database Except User
      </Button> */}
    </Popconfirm>
  )
}
