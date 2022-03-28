import dynamic from 'next/dynamic'
import { Spin } from 'antd'

export * from './MonacoEditorProps'

// Disallow SSR rendering of the editor, because it can't load it properly on the server
export const MonacoEditor = dynamic(() => import('./MonacoEditorInternal'), {
  ssr: false,
  loading: Spin,
})
