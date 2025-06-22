'use client'

import type {
  DomainCreatedSubscription,
  DomainUpdatedSubscription,
} from '@codelab/shared-domain-module-domain'

import {
  DomainCreatedDocument,
  DomainUpdatedDocument,
} from '@codelab/shared-domain-module-domain'
import { browserApolloClient } from '@codelab/shared-infra-gql-client'
import { useEffect } from 'react'

export const Subscriptions = () => {
  useEffect(() => {
    console.log('Subscriptions component mounted')

    const domainCreatedSubscription = browserApolloClient()
      .subscribe<DomainCreatedSubscription>({
        query: DomainCreatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          console.log('Domain Created Event received frontend:', data)

          if (!data) {
            throw new Error('Invalid subscription data')
          }
        },
      })

    const domainUpdatedSubscription = browserApolloClient()
      .subscribe<DomainUpdatedSubscription>({
        query: DomainUpdatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          console.log('Domain Updated Event received:', data)

          if (!data) {
            throw new Error('Invalid subscription data')
          }
        },
      })

    // Cleanup subscriptions when component unmounts
    return () => {
      domainCreatedSubscription.unsubscribe()
      domainUpdatedSubscription.unsubscribe()
    }
  }, [])

  return null
}
