# Cookie-Based Service Tracking Implementation

This implementation uses browser cookies to automatically track which frontend service methods trigger GraphQL operations, helping debug issues like socket hang ups when working with large apps.

## Architecture Overview

```
Frontend (Browser)                    Backend (Server)
│                                    │
├─ element.service#create            │
│  ├─ Set cookies:                   │
│  │  └─ x-service-id: element.service#create
│  │  └─ x-request-id: uuid          │
│  │                                 │
│  ├─ elementRepository.add() ──────>├─ gql-server-request.ts
│  │                                 │  ├─ Read cookies from request
│  │                                 │  └─ Add to GraphQL headers
│  │                                 │
│  └─ syncModifiedElements() ───────>├─ GraphQL Server
│                                    │  └─ serviceTrackingPlugin logs:
│                                    │     [GraphQL] CreateElement | 
│                                    │     Service: element.service#create |
│                                    │     Request: abc-123 | Duration: 150ms
└─ Clear cookies (finally)           │
```

## Implementation Details

### 1. Frontend Service (element.service.ts)

```typescript
const create = async (data: IElementDto) => {
  return withServiceTracking(
    { 
      serviceName: 'element.service',
      methodName: 'create'
    },
    async () => {
      // All operations here will have tracking cookies
      await loadElementRenderTypeApi(data)
      await elementRepository.add(data, {...})
      await syncModifiedElements()
      return element
    }
  )
}
```

### 2. Service Tracking Utility (service-tracking.ts)

- Sets `x-service-id` cookie with service and method name
- Sets `x-request-id` cookie with unique UUID
- Cookies expire after 60 seconds
- Automatically cleans up cookies when operation completes

### 3. Server-Side Request Handler (gql-server-request.ts)

```typescript
// Get cookies from the request
const cookieStore = await cookies()
const serviceId = cookieStore.get('x-service-id')?.value
const requestId = cookieStore.get('x-request-id')?.value

// Add to GraphQL headers
if (serviceId) headers['x-service-id'] = serviceId
if (requestId) headers['x-request-id'] = requestId
```

### 4. Backend GraphQL Plugin (service-tracking-plugin.ts)

Logs all operations with their service context:
```
[GraphQL] CreateElement | Service: element.service#create | Request: abc-123 | Duration: 150ms
```

## Benefits

1. **Automatic Propagation**: No need to pass headers through function calls
2. **Request Correlation**: All operations from one service call share the same request ID
3. **Performance Debugging**: Easily identify which service methods trigger expensive operations
4. **Socket Hang Up Debugging**: Track exactly which service operations are failing

## Usage in Other Services

### Using the Wrapper

```typescript
const move = async (context: IMoveElementContext) => {
  return withServiceTracking(
    { serviceName: 'element.service', methodName: 'move' },
    async () => {
      elementDomainService.move(context)
      await updateElements(elementDomainService.modifiedElements)
    }
  )
}
```

### Using the Decorator

```typescript
class ElementService {
  @trackService('element.service')
  async create(data: IElementDto) {
    // Automatically tracked as element.service#create
  }
}
```

## Debugging

1. **Browser DevTools**: 
   - Application → Cookies to see `x-service-id` and `x-request-id`
   - Network tab shows headers on GraphQL requests

2. **Backend Logs**:
   ```
   [GraphQL] GetAtom | Service: element.service#create | Request: 123-abc | Duration: 50ms
   [GraphQL] CreateElement | Service: element.service#create | Request: 123-abc | Duration: 150ms
   [GraphQL] UpdateElement | Service: element.service#create | Request: 123-abc | Duration: 75ms
   ```

3. **Identifying Patterns**:
   - Multiple operations with same request ID = same service call
   - Long durations = potential performance issues
   - Failed operations show which service method triggered them

## Security Considerations

- Cookies use `sameSite: 'strict'` for CSRF protection
- Short expiration (60s) prevents stale data
- Only tracking metadata, no sensitive data in cookies