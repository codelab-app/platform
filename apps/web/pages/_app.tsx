import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { useAppMachine } from '@codelab/ddd/modules/app-stories/model/store/appMachine/appMachine'
import { AppLayout } from '@codelab/ddd/modules/app-stories/view/AppLayout'
import { AppSidebar } from '@codelab/ddd/modules/app-stories/view/AppSidebar'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

const App = ({ children }: PropsWithChildren<any>) => {
  const appMachine = useAppMachine()

  console.log(appMachine)

  return <AppLayout sidebar={<AppSidebar />}>{children}</AppLayout>
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <RecoilRoot>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
      <App>
        <Component {...pageProps} />
      </App>
    </RecoilRoot>
  )
}

export default AppContainer
