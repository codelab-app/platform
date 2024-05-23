'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const HomeView = () => {
  const { error, isLoading, user } = useUser()

  return (
    <div>
      <Link href="http://127.0.0.1:16686" target="_blank">
        Jaeger
      </Link>
      {user ? (
        // <Link> causes a cors issue that why we use normal anchor
        <Button href="/api/auth/logout" id="logout" type="primary">
          Log Out
        </Button>
      ) : (
        <Button href="/api/auth/login" id="login" type="primary">
          Log In
        </Button>
      )}
    </div>
  )
}

export default HomeView
