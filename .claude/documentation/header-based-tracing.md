# Header-Based Tracing Implementation

This implementation uses HTTP headers to track which frontend service methods trigger GraphQL operations, providing better observability and debugging capabilities without the limitations of cookies.

## Architecture Overview

```
Frontend (Browser)                    Backend (Server)
│                                    │
├─ element.service#create            │
│  ├─ Generate:                      │
│  │  └─ operationId: 'create-element'
│  │  └─ requestId: uuid             │
│  │                                 │
│  ├─ elementRepository.add({        │
│  │    logging: {                   │
│  │      operationId,               │
│  │      requestId                  │
│  │    }                            │
│  │  }) ───────────────────────────>├─ gql-server-request.ts
│  │                                 │  ├─ Extract logging from options
│  │                                 │  └─ Add to HTTP headers:
│  │                                 │     └─ x-operation-id
│  │                                 │     └─ x-request-id
│  │                                 │
│  └─ syncModifiedElements() ───────>├─ GraphQL Server
│                                    │  └─ serviceTrackingPlugin logs:
│                                    │     [GraphQL] CreateElement | 
│                                    │     Service: create-element |
│                                    │     Request: abc-123 | Duration: 150ms
└─                                   │
```

## Implementation Details

### 1. Frontend Service (element.service.ts)

```typescript
import { ElementService } from '@codelab/frontend-abstract-application'
import { v4 as uuidv4 } from 'uuid'

const create = async (data: IElementDto) => {
  // Generate unique request ID for this operation
  const requestId = uuidv4()
  
  await loadElementRenderTypeApi(data)
  
  await elementRepository.add(data, {
    revalidateTags: [CACHE_TAGS.Element.list()],
    logging: {
      operationId: ElementService.CreateElement,
      requestId,
    },
  })
  
  await syncModifiedElements()
  return element
}
```

### 2. Tracing Headers Constants (libs/shared/infra/tracing)

```typescript
export const TRACING_HEADERS = {
  OPERATION_ID: 'x-operation-id',
  REQUEST_ID: 'x-request-id',
} as const
```

### 3. Server-Side Request Handler (gql-server-request.ts)

```typescript
import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'

export const gqlServerRequest = async (
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables,
  next?: NextFetchOptions,
) => {
  const headers: Record<string, string> = {
    Accept: 'application/graphql-response+json',
    'Content-Type': 'application/json',
  }

  // Add tracing headers from logging options
  if (next?.logging?.operationId) {
    headers[TRACING_HEADERS.OPERATION_ID] = next.logging.operationId
  }
  if (next?.logging?.requestId) {
    headers[TRACING_HEADERS.REQUEST_ID] = next.logging.requestId
  }
  
  // ... rest of implementation
}
```

### 4. Backend GraphQL Plugin (service-tracking-plugin.ts)

```typescript
import { TRACING_HEADERS } from '@codelab/shared-infra-tracing'

export const serviceTrackingPlugin: ApolloServerPlugin<any> = {
  async requestDidStart() {
    return {
      async willSendResponse(ctx) {
        const operationId = ctx.request.http?.headers?.get(TRACING_HEADERS.OPERATION_ID)
        const requestId = ctx.request.http?.headers?.get(TRACING_HEADERS.REQUEST_ID)
        
        const operationName = ctx.operation?.name?.value || 'Unknown'
        const duration = Date.now() - (ctx.contextValue?.startTime || 0)
        
        console.log(
          `[GraphQL] ${operationName} | Service: ${operationId || 'unknown'} | Request: ${requestId || 'unknown'} | Duration: ${duration}ms`
        )
      }
    }
  }
}
```

## Enhanced Tracing with Service Context

For more detailed tracing, we can adopt the `service.component` convention to add context about which Next.js page or layout initiated the operation:

```typescript
// In a Next.js page component
const PageBuilder = () => {
  const elementService = useElementService()
  
  const handleCreateElement = async (data: IElementDto) => {
    await elementService.create(data, {
      // Adds context about where the operation originated
      serviceContext: 'page-builder.layout'
    })
  }
}

// In element.service.ts
const create = async (data: IElementDto, options?: { serviceContext?: string }) => {
  const operationId = options?.serviceContext 
    ? `${ElementService.CreateElement}.${options.serviceContext}`
    : ElementService.CreateElement
    
  await elementRepository.add(data, {
    logging: {
      operationId,
      requestId: uuidv4(),
    },
  })
}
```

## Benefits Over Cookie-Based Approach

1. **No Cookie Limitations**: Not subject to browser cookie restrictions or SameSite policies
2. **Explicit Control**: Each operation explicitly declares its tracing, making it more maintainable
3. **Type Safety**: Using enums for operation IDs provides compile-time safety
4. **Better Composition**: Headers can be passed through async contexts without global state
5. **Standards Compliant**: Uses standard HTTP headers following OpenTelemetry conventions

## Usage Examples

### Basic Usage

```typescript
const update = async (data: IUpdateElementData) => {
  await elementRepository.update(
    { id: currentElement.id }, 
    newElement, 
    {
      logging: {
        operationId: ElementService.UpdateElement,
        requestId: uuidv4(),
      },
    }
  )
}
```

### Batch Operations

```typescript
const updateElements = async (elements: Array<IElementModel>) => {
  // Use same requestId for all operations in the batch
  const requestId = uuidv4()
  
  await Promise.all(
    elements.map((element) =>
      elementRepository.update(
        { id: element.id }, 
        element.toJson, 
        {
          revalidateTags: [CACHE_TAGS.Element.list()],
          logging: {
            operationId: ElementService.UpdateElementsBatch,
            requestId,
          },
        }
      )
    )
  )
}
```

## Debugging

1. **Network Tab**: 
   - Check request headers for `x-operation-id` and `x-request-id`
   - All related operations share the same request ID

2. **Backend Logs**:
   ```
   [GraphQL] GetAtom | Service: create-element | Request: 123-abc | Duration: 50ms
   [GraphQL] CreateElement | Service: create-element | Request: 123-abc | Duration: 150ms
   [GraphQL] UpdateElement | Service: update-element | Request: 456-def | Duration: 75ms
   ```

3. **Correlation**:
   - Same `requestId` = operations from the same user action
   - `operationId` identifies the service method that initiated the operations
   - Duration helps identify performance bottlenecks

## Future Enhancements

1. **OpenTelemetry Integration**: Headers are compatible with standard tracing systems
2. **Distributed Tracing**: Can be extended to trace across multiple services
3. **Metrics Collection**: Operation IDs can be used for aggregating performance metrics
4. **Error Tracking**: Associate errors with specific service operations

## Migration from Cookie-Based Tracking

1. Remove `withServiceTracking` wrapper functions
2. Add `logging` option to repository calls with appropriate operation ID
3. Generate unique `requestId` using `uuidv4()` for each user action
4. Update imports to use constants from `@codelab/shared-infra-tracing`
5. Remove cookie-related code and dependencies