import { AppProps } from 'next/app'
import React from 'react'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

// axios.defaults.headers.post['Content-Type'] = 'application/json'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default App
