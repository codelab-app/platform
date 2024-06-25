import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAsync } from '@react-hookz/web'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React from 'react'

export const ResetDataButtons = observer(() => {
  const { adminService } = useStore()
  const router = useRouter()

  const [{ status: resetDatabaseExceptUserStatus }, resetDatabaseExceptUser] =
    useAsync(adminService.resetDatabaseExceptUser)

  const [{ status: resetDatabaseStatus }, resetDatabase] = useAsync(
    adminService.resetDatabase,
  )

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
        disabled={resetDatabaseStatus === 'loading'}
        onClick={() =>
          resetDatabase
            .execute()
            .then(onSuccess)
            .catch(onError)
            .then(() => {
              router.push('/api/auth/logout')
            })
        }
      >
        Reset Database
      </Button>
      {/* <Button
        disabled={resetDatabaseExceptUserStatus === 'loading'}
        onClick={() =>
          resetDatabaseExceptUser
            .execute()
            .then(onSuccess)
            .catch(onError)
            .then(() => router.push('/api/auth/logout'))
        }
      >
        Reset Database Except User
      </Button> */}
    </>
  )
})
