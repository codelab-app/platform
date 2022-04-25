import { notify } from '@codelab/frontend/shared/utils'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

export * from './MonacoEditorProps'

// Disallow SSR rendering of the editor, because it can't load it properly on the server
export const MonacoEditor = dynamic(() => import('./MonacoEditorInternal'), {
  ssr: false,
  loading: ({ isLoading, error }) => {
    if (isLoading) {
      return React.createElement(Spin)
    }

    if (error) {
      notify({ title: 'Error while loading monaco editor', type: 'error' })

      return null
    }

    return null
  },
})
