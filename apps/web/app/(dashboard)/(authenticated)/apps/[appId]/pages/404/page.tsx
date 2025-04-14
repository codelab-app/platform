import type { Metadata } from 'next'

export const metadata: Metadata = {
  // description: '...',
  title: 'Page Not Found',
}

const Error404Page = () => {
  return <h1>404 - Page not found</h1>
}

export default Error404Page

Error404Page.displayName = 'Page404'
