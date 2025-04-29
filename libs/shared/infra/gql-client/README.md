# GraphQL Client Module

This module provides GraphQL client utilities for both browser and Node.js environments, properly separated through subpath exports.

## Usage

### Browser Environment

For browser environments (including Next.js client components), import the browser-safe client:

```typescript
import { getBrowserApolloClient } from '@codelab/shared/infra/gql-client'

const client = getBrowserApolloClient()

// Use for queries and mutations only (no subscriptions in browser)
const result = await client.query({
  query: YourQueryDocument,
})
```

### Node.js Environment

For Node.js environments (including Next.js API routes and server components), import the Node.js client using the `/server` subpath export:

```typescript
// Import from the server subpath
import { getNodeApolloClient } from '@codelab/shared/infra/gql-client/server'

const client = getNodeApolloClient()

// Can be used for queries, mutations, and subscriptions
const subscription = client
  .subscribe({
    query: YourSubscriptionDocument,
  })
  .subscribe({
    next: (data) => console.log('Subscription data:', data),
  })
```

## Architecture

The module is structured to prevent Node.js-specific modules (`net`, `tls` via the `ws` package) from being included in browser bundles:

- Package exports define separate paths for browser and server code:

  - Main export `.` - Browser-safe code only
  - Subpath export `./server` - Server-specific code with WebSocket support

- Browser client uses only HTTP links
- Node.js client includes WebSocket links for subscriptions
- Legacy API maintained for backward compatibility
