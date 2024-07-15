import '../styles/global.css'
import '../styles/shadcn.global.css'
import { cn } from '@cui/utils'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
