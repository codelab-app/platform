'use client'

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import { getQueryClient } from './query.client'

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  /**
   * NOTE: Avoid useState when initializing the query client if you don't have a suspense boundary between this and the code that may suspend because React will throw away the client on the initial render if it suspends and there is no boundary
   */
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
