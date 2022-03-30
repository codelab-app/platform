import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService } from '@codelab/frontend/modules/app'
import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import {
  BuilderService,
  renderContext,
  RenderService,
} from '@codelab/frontend/modules/builder'
import { ElementService } from '@codelab/frontend/modules/element'
import { PageService } from '@codelab/frontend/modules/page'
import { ActionService, StoreService } from '@codelab/frontend/modules/store'
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

  elementService: prop(() => new ElementService({})), // default regular service that holds the element tree
  providerElementService: prop(() => new ElementService({})), // element service that is used by the provider tree
  builderService: prop(() => new BuilderService({})),

  // This is the default render service used for rendering apps.
  // do not confuse it with the builder-specific render service in builderService.builderRenderer
  renderService: prop(() => new RenderService({})),
  storeService: prop(() => new StoreService({})),
  actionService: prop(() => new ActionService({})),
}) {
  protected onInit(): void {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    renderContext.set(this, this.renderService)
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

  if (process.env.NODE_ENV === 'development') {
    ;(window as any).store = store
  }

  return store
}
