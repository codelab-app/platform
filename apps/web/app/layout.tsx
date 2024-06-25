import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

export default RootLayout
