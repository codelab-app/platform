import type { Metadata } from 'next'

export const metadata: Metadata = {
  // description: '...',
  title: 'Internal Server Error',
}

const Error500Page = () => {
  return <h1>500 - Internal Server Error</h1>
}

export default Error500Page

Error500Page.displayName = 'Page500'
