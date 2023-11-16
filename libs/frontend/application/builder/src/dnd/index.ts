import dynamic from 'next/dynamic'

export * from './MakeChildrenDraggable'
export * from './MakeChildrenDroppable'
export * from './MakeComponentDroppable'

export const BuilderDndContext = dynamic(() => import('./BuilderDndContext'), {
  ssr: false,
})
