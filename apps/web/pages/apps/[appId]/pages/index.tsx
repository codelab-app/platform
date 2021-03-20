import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React from 'react'

const AppPagePage = () => {
  const router = useRouter()

  return <h1>Pages</h1>
}

// Redirect to home if not authenticated
export const getServerSideProps = withPageAuthRequired()

export default AppPagePage
