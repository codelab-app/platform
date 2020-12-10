import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { AppLayout } from '@codelab/ddd/modules/layout-stories/view/AppLayout'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <RecoilRoot>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  )
}

export default App
