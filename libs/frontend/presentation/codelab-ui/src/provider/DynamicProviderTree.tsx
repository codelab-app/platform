import dynamic from 'next/dynamic'

export const DynamicProvidersTree = dynamic(() => import('./ProviderTree'), {
  ssr: false,
})
