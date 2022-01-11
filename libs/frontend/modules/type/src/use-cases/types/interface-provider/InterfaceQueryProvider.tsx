import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { InterfaceProvider } from './InterfaceProvider'

export const InterfaceQueryProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const interfaceId = query.interfaceId

  if (!interfaceId) {
    throw new Error('InterfaceId not found in query')
  }

  return (
    <InterfaceProvider interfaceId={interfaceId as string}>
      {children}
    </InterfaceProvider>
  )
}

export const withInterfaceQueryProvider = <TProps,>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <InterfaceQueryProvider>
      <Component {...(props as any)} />
    </InterfaceQueryProvider>
  )
}

InterfaceQueryProvider.displayName = 'InterfaceQueryProvider'
