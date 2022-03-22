import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService } from '@codelab/frontend/modules/app'
import { AtomService, atomStoreContext } from '@codelab/frontend/modules/atom'
import { renderContext, RendererModel } from '@codelab/frontend/modules/builder'
import { ElementStore } from '@codelab/frontend/modules/element'
import { PageService } from '@codelab/frontend/modules/page'
import { TagService } from '@codelab/frontend/modules/tag'
import { TypeService, typeStoreContext } from '@codelab/frontend/modules/type'
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
  elementService: prop(() => new ElementStore({})),
  renderer: prop(() => new RendererModel({})),
}) {
  protected onInit(): void {
    typeStoreContext.set(this, this.typeService)
    atomStoreContext.set(this, this.atomService)
    renderContext.set(this, this.renderer)
  }
}

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

  return store
}
