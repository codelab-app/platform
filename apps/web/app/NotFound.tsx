'use client'

import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  return (
    <Result
      extra={
        <Button
          onClick={() => {
            router.push('/apps')
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      title="404"
    />
  )
}

export default NotFound
