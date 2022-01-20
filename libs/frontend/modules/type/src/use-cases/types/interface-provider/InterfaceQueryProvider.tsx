import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { InterfaceProvider } from './InterfaceProvider'

export const InterfaceQueryProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const interfaceId = query.interfaceId as string

  if (!interfaceId) {
    throw new Error('InterfaceId not found in query')
  }

  return (
    <InterfaceProvider interfaceId={interfaceId}>{children}</InterfaceProvider>
  )
}

export const withInterfaceQueryProvider = <TProps,>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <InterfaceQueryProvider>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </InterfaceQueryProvider>
  )
}

InterfaceQueryProvider.displayName = 'InterfaceQueryProvider'
