import React from 'react'
import { CuiStoreProvider } from '../components/provider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CuiStoreProvider>{children}</CuiStoreProvider>
}

export default Layout
