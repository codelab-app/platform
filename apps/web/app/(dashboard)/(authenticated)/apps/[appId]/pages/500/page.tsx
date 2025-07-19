import type { Metadata } from 'next'

export const metadata: Metadata = {
  // description: '...',
  title: 'Internal Server Error',
}

const ErrorServerPage = () => {
  return <h1>500 - Internal Server Error</h1>
}

export default ErrorServerPage

ErrorServerPage.displayName = 'Page500'
