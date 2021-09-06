import dynamic from 'next/dynamic'

export * from './EmotionCssEditorProps'

// Disallow SSR rendering of the editor, because it can't load it properly on the server
export const EmotionCssEditor = dynamic(() => import('./EmotionCssEditor'), {
  ssr: false,
})
