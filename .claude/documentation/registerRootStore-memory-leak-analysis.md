# RegisterRootStore Memory Leak Analysis

## Summary

The `registerRootStore` function in MobX-Keystone is causing memory accumulation during navigation in the Next.js development server. Each navigation triggers a new store creation without proper cleanup of the previous one.

## Key Findings

### 1. Store Registration Flow

**Current Implementation:**
- `RootProviders` component creates a new store on every render (apps/web/providers/RootProviders.tsx:19-25)
- `createRootStore` calls `registerRootStore(rootStore)` (libs/frontend/infra/mobx/store/src/stores/root.store.ts:42)
- The store is memoized by `user.id`, but still recreates on navigation

### 2. Missing Cleanup

**Problem:**
- `registerRootStore` is called but `unregisterRootStore` is never called in production code
- Only test files use `unregisterRootStore` for cleanup (test.store.ts:584, app.domain.spec.ts:47)
- No cleanup happens when components unmount or during navigation

### 3. Navigation Behavior

**On Each Navigation:**
1. Authenticated layout re-renders (layout.tsx)
2. RootProviders component re-mounts
3. New store is created via `createRootStore`
4. `registerRootStore` globally registers the new store
5. Previous store remains in memory (not unregistered)

### 4. Global State Accumulation

**Multiple Global Registrations:**
- `setGlobalConfig` is called in `createRootStore` (root.store.ts:21)
- Each store registration adds to global MobX-Keystone state
- No mechanism to clean up previous registrations

## Impact

- **Memory Growth**: ~400MB per navigation as reported
- **Development Only**: More severe in dev due to HMR keeping old modules
- **Compounding Issue**: Combines with Next.js's known HMR memory leak

## Recommendations

### 1. Immediate Fix - Add Cleanup

```typescript
// In RootProviders.tsx
useEffect(() => {
  return () => {
    if (rootStore?.rootStore) {
      unregisterRootStore(rootStore.rootStore)
    }
  }
}, [rootStore])
```

### 2. Store Singleton Pattern

Consider implementing a singleton pattern for the root store to prevent multiple registrations:

```typescript
let globalRootStore: IRootStore | null = null

export const createRootStore = ({ user }: IRootStoreInput) => {
  if (globalRootStore) {
    // Update existing store with new user if needed
    return { rootStore: globalRootStore, undoManager }
  }
  // ... rest of creation logic
}
```

### 3. Check Before Registration

Add a check to prevent duplicate registrations:

```typescript
// Only register if not already registered
if (!isRootStoreRegistered(rootStore)) {
  registerRootStore(rootStore)
}
```

## Additional Notes

- The test store (test.store.ts) properly implements cleanup with `teardown()` method
- Production code lacks this cleanup pattern
- This issue compounds with Next.js's HMR memory leak but is a separate problem

## References

- registerRootStore usage: root.store.ts:42, test.store.ts:660
- unregisterRootStore usage: test.store.ts:584, app.domain.spec.ts:47
- RootProviders: apps/web/providers/RootProviders.tsx
- Layout: apps/web/app/(dashboard)/(authenticated)/layout.tsx