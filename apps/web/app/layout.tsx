import '../styles/global.css'
import '../styles/shadcn.global.css'
import { RootProviders } from '@codelab/frontend/infra/context'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { cn } from '@cui/utils'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <RootProviders user={user}>{children}</RootProviders>
      </body>
    </html>
  )
}

export default RootLayout
