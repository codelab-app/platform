# Cookie-Based Service Tracking

## How It Works

The cookie-based approach sets tracking information in browser cookies that are automatically sent with server requests, allowing the backend to identify which service method triggered GraphQL operations.

### 1. In element.service.ts

```typescript
const create = async (data: IElementDto) => {
  return withServiceTracking(
    { 
      serviceName: 'element.service',
      methodName: 'create'
    },
    async () => {
      // All operations here will have tracking cookies set
      await loadElementRenderTypeApi(data)
      await elementRepository.add(data, {...})
      await syncModifiedElements()
      return element
    }
  )
}
```

### 2. What Happens Under the Hood

The `withServiceTracking` wrapper:
1. Sets `x-service-id` cookie to `"element.service#create"`
2. Sets `x-request-id` cookie to a unique UUID
3. Executes your async function
4. Cleans up cookies when done (in finally block)

### 3. In gql-server-request.ts

```typescript
// Get cookies from the request
const cookieStore = await cookies()
const serviceId = cookieStore.get('x-service-id')?.value
const requestId = cookieStore.get('x-request-id')?.value

// Add to headers if present
if (serviceId) {
  headers['x-service-id'] = serviceId
}
if (requestId) {
  headers['x-request-id'] = requestId
}
```

### 4. Request Flow

```
Browser (element.service#create)
  ├─ Sets cookies: x-service-id=element.service#create, x-request-id=uuid
  ├─ Calls elementRepository.add()
  │   └─ Server Action (gql-server-request)
  │       ├─ Reads cookies from request
  │       └─ Adds to GraphQL headers
  └─ Cleans up cookies when done
```

## Benefits

1. **Automatic Propagation**: Cookies are automatically sent with every request
2. **No Prop Drilling**: No need to pass headers through function calls
3. **Server-Side Access**: Next.js server actions can read cookies
4. **Clean Implementation**: Wrapper pattern keeps code clean

## Usage Examples

### Basic Usage

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
    await loadElementRenderTypeApi(data)
    await elementRepository.add(data, {...})
  }
}
```

### Manual Cookie Management

```typescript
const cleanup = setServiceTracking({
  serviceName: 'custom-service',
  methodName: 'batch-operation'
})

try {
  // Do multiple operations
  await operation1()
  await operation2()
  await operation3()
} finally {
  cleanup()
}
```

## Important Notes

1. **Cookie Expiration**: Cookies expire after 60 seconds to prevent stale data
2. **Same-Site Policy**: Cookies use `sameSite: 'strict'` for security
3. **Server Actions**: Only works with Next.js server actions that can read cookies
4. **Cleanup**: Always cleans up cookies even if operations fail

## Debugging

To see the cookies being set:
1. Open browser DevTools → Application → Cookies
2. Watch for `x-service-id` and `x-request-id` cookies
3. Check Network tab to see headers being sent

In backend logs, you'll see:
```
[GraphQL] Request from element.service#create (request-id: 123e4567-e89b-12d3-a456-426614174000)
├─ GetAtom
├─ CreateElement
└─ UpdateElements (x15)
```