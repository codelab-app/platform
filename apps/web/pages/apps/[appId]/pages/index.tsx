import { useRouter } from 'next/router'
import React from 'react'
import { Page, withAuthGuardServerSideProps } from '@codelab/frontend'

const AppPagePage = () => {
  const router = useRouter()

  return <h1>Pages</h1>
}

// Redirect to home if not authenticated
export const getServerSideProps = withAuthGuardServerSideProps({
  destination: Page.HOME.url,
  permanent: false,
})

export default AppPagePage
