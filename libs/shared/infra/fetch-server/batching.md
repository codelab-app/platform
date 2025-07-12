# GraphQL Request Batching

## Overview

GraphQL request batching is now built directly into `serverFetchWithAuth`. Multiple GraphQL requests that occur within a time window are automatically combined into a single HTTP request, improving performance and reducing network overhead. This happens transparently - no code changes required!

## How It Works

```typescript
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'

// These requests are automatically batched
const [users, posts, comments] = await Promise.all([
  gqlServerRequest(GetUsersDocument, { limit: 10 }),
  gqlServerRequest(GetPostsDocument, { userId: 1 }),
  gqlServerRequest(GetCommentsDocument, { postId: 1 })
])
// These three requests are combined into a single HTTP call!
```

The batching happens inside `serverFetchWithAuth`:
1. It detects GraphQL requests by checking for a `query` field in the request body
2. GraphQL requests are queued and batched within a 20ms window
3. Up to 10 operations are combined into a single HTTP request
4. Non-GraphQL requests bypass batching and go directly through

## Configuration

Currently, the batching configuration is fixed at:
- **Batch interval**: 20ms (time window to collect requests)
- **Max batch size**: 10 operations per batch

These values are optimized for most use cases and provide a good balance between latency and efficiency.

## Benefits

1. **Reduced Network Overhead**: Fewer HTTP connections and handshakes
2. **Better Performance**: Especially for pages loading multiple resources
3. **Efficient Auth Token Usage**: One token retrieval per batch instead of per request
4. **ECONNRESET Mitigation**: Fewer concurrent connections reduce connection reset errors
5. **Transparent**: No code changes required for existing `gqlServerRequest` calls

## Implementation Details

- GraphQL requests are automatically detected and batched
- Non-GraphQL requests (REST APIs, file uploads, etc.) are not affected
- Authentication is handled once per batch for all operations
- Each request in a batch maintains its own promise that resolves/rejects independently
- The batch fetcher uses a singleton pattern for efficiency

## Requirements

- The GraphQL server must support batched queries (Apollo Server supports this by default)
- Authentication is handled once per batch for all operations