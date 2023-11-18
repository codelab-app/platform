import dynamic from 'next/dynamic'

export const BuilderDndContext = dynamic(() => import('./BuilderDndContext'), {
  ssr: false,
})
