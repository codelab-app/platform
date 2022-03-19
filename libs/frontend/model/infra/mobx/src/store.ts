import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService } from '@codelab/frontend/modules/app'
import { AtomService, atomStoreRef } from '@codelab/frontend/modules/atom'
import { ElementStore } from '@codelab/frontend/modules/element'
import { PageService } from '@codelab/frontend/modules/page'
import { TagService } from '@codelab/frontend/modules/tag'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import {
  fromSnapshot,
  Model,
  model,
  prop,
  registerRootStore,
  SnapshotOutOf,
} from 'mobx-keystone'

export type Snapshot<T = any> = {
  snapshot: SnapshotOutOf<T>
}

@model('codelab/RootStore')
export class RootStore extends Model({
  appService: prop(() => new AppService({})),
  pageService: prop(() => new PageService({})),
  typeService: prop(() => new TypeService({})),
  atomService: prop(() => new AtomService({})),
  tagService: prop(() => new TagService({})),
  adminService: prop(() => new AdminService({})),
  elementStore: prop(
    () => new ElementStore({ atomStore: atomStoreRef(atomStoreId) }),
  ),
}) {}

let _store: RootStore | null = null

export const initializeStore = (snapshot: any = null) => {
  const store =
    _store ?? snapshot ? fromSnapshot<RootStore>(snapshot) : new RootStore({})

  if (!_store) {
    registerRootStore(store)
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return store
  }

  // Create the store once in the client
  if (!_store) {
    _store = store
  }

  if (process.env.NODE_ENV === 'development') {
    ;(window as any).store = store
  }

  return store
}
