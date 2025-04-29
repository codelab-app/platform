'use client'

import type {
  DomainCreatedSubscription,
  DomainUpdatedSubscription,
} from '@codelab/shared-domain-module-domain'

import { getBrowserApolloClient } from '@codelab/shared-infra-gql-client'
import {
  DomainCreatedDocument,
  DomainUpdatedDocument,
} from '@codelab/shared-domain-module-domain'
import { useEffect } from 'react'

/**
 * NOTE: This component attempts to use GraphQL subscriptions in the browser.
 * WebSocket subscriptions require Node.js-specific modules which are now properly
 * separated into '@codelab/shared-infra-gql-client/server'.
 *
 * Options for real-time updates in client components:
 * 1. Use polling instead (shown below)
 * 2. Move subscription logic to a server component or API route, then pass data via props or context
 * 3. Use a browser-compatible WebSocket implementation (not the Node.js 'ws' package)
 */
export const Subscriptions = () => {
  useEffect(() => {
    console.log('Subscriptions component mounted')

    // Browser-safe client only supports HTTP operations (queries and mutations)
    const client = getBrowserApolloClient()

    // Use polling as a browser-compatible alternative to subscriptions
    const polling = setInterval(() => {
      // Replace with your actual query documents
      client
        .query({
          query: DomainCreatedDocument, // Replace with a regular query, not subscription
          fetchPolicy: 'network-only',
        })
        .then((result) => {
          console.log('Polling result:', result)
        })
        .catch((error) => {
          console.error('Polling error:', error)
        })
    }, 5000) // Poll every 5 seconds

    // Cleanup polling when component unmounts
    return () => {
      clearInterval(polling)
    }
  }, [])

  return null
}
