import 'server-only'
import '../styles/global.css'
import type { NextPage } from 'next'
import React from 'react'

const RootLayout: NextPage = async ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
