import dynamic from 'next/dynamic'

export const HomeTemplate = dynamic(() => import('./HomeTemplate'), {
  ssr: false,
})
