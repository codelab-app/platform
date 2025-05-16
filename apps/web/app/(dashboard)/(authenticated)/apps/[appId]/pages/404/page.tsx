import type { Metadata } from 'next'

export const metadata: Metadata = {
  // description: '...',
  title: 'Page Not Found',
}

const NotFoundPage = () => {
  return <h1>404 - Page not found</h1>
}

export default NotFoundPage
