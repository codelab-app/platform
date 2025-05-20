import type { Metadata } from 'next'

export const metadata: Metadata = {
  // description: '...',
  title: 'Internal Server Error',
}

const InternalServerErrorPage = () => {
  return <h1>500 - Internal Server Error</h1>
}

export default InternalServerErrorPage
