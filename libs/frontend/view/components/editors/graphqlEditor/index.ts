import dynamic from 'next/dynamic'

export * from './GraphqlEditorField'

// Disallow SSR rendering of the editor, because it can't load it properly on the server
export const GraphqlEditor = dynamic(() => import('./GraphqlEditorInternal'), {
  ssr: false,
})
