import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService } from '@codelab/frontend/modules/app'
import {
  AtomImportService,
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/modules/atom'
import {
  BuilderService,
  RenderService,
  renderServiceContext,
} from '@codelab/frontend/modules/builder'
import {
  ComponentService,
  componentServiceContext,
} from '@codelab/frontend/modules/component'
import {
  ElementService,
  elementServiceContext,
} from '@codelab/frontend/modules/element'
import { PageService } from '@codelab/frontend/modules/page'
import {
  OperationService,
  operationServiceContext,
  ResourceService,
  resourceServiceContext,
} from '@codelab/frontend/modules/resource'
import {
  ActionService,
  actionServiceContext,
  StoreResourceService,
  StoreService,
} from '@codelab/frontend/modules/store'
import { TagService } from '@codelab/frontend/modules/tag'
import {
  TypeImportService,
  typeImportServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/modules/type'
import { UserService, userServiceContext } from '@codelab/frontend/modules/user'
import { IPageProps, IUserDTO } from '@codelab/shared/abstract/core'
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

interface RootStoreProps {
  user?: IUserDTO
}

export type IRootStore = {
  userService: UserService
  appService: AppService
  pageService: PageService
  typeService: TypeService
  typeImportService: TypeImportService
  atomService: AtomService
  atomImportService: AtomImportService
  tagService: TagService
  adminService: AdminService
  componentService: ComponentService
  actionService: ActionService
  storeService: StoreService
  elementService: ElementService
  providerElementService: ElementService
  builderService: BuilderService
  renderService: RenderService
  operationService: OperationService
  resourceService: ResourceService
  storeResourceService: StoreResourceService
}

export const createRootStore = ({ user }: RootStoreProps) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      userService: prop(() => UserService.init(user)),
      appService: prop(() => new AppService({})),
      pageService: prop(() => new PageService({})),
      typeService: prop(() => new TypeService({})),
      typeImportService: prop(() => new TypeImportService({})),
      atomService: prop(() => new AtomService({})),
      atomImportService: prop(() => new AtomImportService({})),
      tagService: prop(() => new TagService({})),
      adminService: prop(() => new AdminService({})),
      componentService: prop(() => new ComponentService({})),
      actionService: prop(() => new ActionService({})),
      storeService: prop(() => new StoreService({})),
      resourceService: prop(() => new ResourceService({})),
      operationService: prop(() => new OperationService({})),
      storeResourceService: prop(() => new StoreResourceService({})),
      // default regular service that holds the element tree
      elementService: prop(() => new ElementService({})),
      // element service that is used by the provider tree
      providerElementService: prop(() => new ElementService({})),
      builderService: prop(() => new BuilderService({})),
      // This is the default render service used for rendering apps.
      // do not confuse it with the builder-specific render service in builderService.builderRenderer
      renderService: prop(() => new RenderService({})),
    })
    implements IRootStore
  {
    protected onInit(): void {
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      renderServiceContext.set(this, this.renderService)
      actionServiceContext.set(this, this.actionService)
      resourceServiceContext.set(this, this.resourceService)
      operationServiceContext.set(this, this.operationService)
      typeImportServiceContext.set(this, this.typeImportService)
      elementServiceContext.set(this, this.elementService)
      userServiceContext.set(this, this.userService)
    }
  }

  return new RootStore({}) as unknown as IRootStore
}

let _store: IRootStore | null = null

export const initializeStore = (pageProps: IPageProps) => {
  const snapshot = pageProps?.snapshot
  const user = pageProps?.user

  const store: IRootStore =
    _store ?? snapshot
      ? fromSnapshot<IRootStore>(snapshot)
      : createRootStore({ user })

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
