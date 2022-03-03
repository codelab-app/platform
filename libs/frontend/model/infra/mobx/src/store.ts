import { AppStore } from '@codelab/frontend/modules/app'
import { PageStore } from '@codelab/frontend/modules/page'
import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree'

const RootStore = types.model({
  apps: AppStore,
  pages: PageStore,
})

export type RootStore = Instance<typeof RootStore>

let store: RootStore | undefined

export const initializeStore = (
  snapshot: SnapshotIn<typeof RootStore> | null = null,
) => {
  const _store =
    store ??
    RootStore.create({
      apps: { apps: {}, createModal: {}, deleteModal: {}, updateModal: {} },
      pages: { pages: {}, createModal: {}, deleteModal: {}, updateModal: {} },
    })

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot)
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return store
}
