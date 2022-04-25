import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService } from '@codelab/frontend/modules/app'
import {
  AtomService,
  atomServiceContext,
  ImportAtomService,
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
  ImportTypeService,
  importTypeServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/modules/type'
import { UserService, userServiceContext } from '@codelab/frontend/modules/user'
import {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElementService,
  IImportAtomService,
  IImportTypeService,
  IPageProps,
  IPageService,
  IRenderService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserDTO,
  IUserService,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { isServer } from '@codelab/shared/utils'
import {
  Model,
  model,
  prop,
  registerRootStore,
  SnapshotOutOf,
} from 'mobx-keystone'

export type Snapshot<T = any> = {
  snapshot: SnapshotOutOf<T>
}

/**
 * Initial data to be injected into store
 */
interface RootStoreData {
  user?: IUserDTO
}

export type IRootStore = {
  userService: IUserService
  appService: IAppService
  pageService: IPageService
  typeService: ITypeService
  importTypeService: IImportTypeService
  atomService: IAtomService
  importAtomService: IImportAtomService
  tagService: ITagService
  adminService: IAdminService
  componentService: IComponentService
  actionService: IActionService
  storeService: IStoreService
  elementService: IElementService
  providerElementService: IElementService
  builderService: IBuilderService
  renderService: IRenderService
  resourceService: ResourceService
  storeResourceService: StoreResourceService
}

export const createRootStore = (
  { user }: RootStoreData,
  props?: Partial<IRootStore>,
) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      userService: prop(() => UserService.init(user)),
      appService: prop(() => new AppService({})),
      pageService: prop(() => new PageService({})),
      typeService: prop(() => new TypeService({})),
      importTypeService: prop(() => new ImportTypeService({})),
      atomService: prop(() => new AtomService({})),
      importAtomService: prop(() => new ImportAtomService({})),
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
      /*
       * This is the default render service used for rendering apps.
       * do not confuse it with the builder-specific render service in builderService.builderRenderer
       */
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
      importTypeServiceContext.set(this, this.importTypeService)
      resourceServiceContext.set(this, this.resourceService)
      operationServiceContext.set(this, this.operationService)
      elementServiceContext.set(this, this.elementService)
      userServiceContext.set(this, this.userService)
    }
  }

  return new RootStore(props ?? ({} as any)) as IRootStore
}

let _store: IRootStore | null = null

/**
 * User is passed automatically when we call withPageAuthRequired
 *
 * @param pageProps
 */
export const initializeStore = (pageProps?: IPageProps) => {
  // console.debug('store', pageProps)

  const snapshot = pageProps?.snapshot
  const user = pageProps?.user

  // if (_store) {
  //   console.info('Using _store')
  // } else if (snapshot) {
  //   console.info('Using snapshot')
  // } else {
  //   console.info('createRootStore')
  // }

  /**
   * Having issue on window hot reload if we return the cached _store
   */
  // const store: IRootStore =
  //   _store ?? snapshot
  //     ? fromSnapshot<IRootStore>(snapshot)
  //     : createRootStore({
  //         user: {
  //           id: user?.sub ?? '',
  //           auth0Id: user?.sub ?? '',
  //           roles: user?.[JWT_CLAIMS]?.roles ?? [],
  //         },
  //       })

  const store: IRootStore = createRootStore({
    user: {
      id: user?.sub ?? '',
      auth0Id: user?.sub ?? '',
      roles: user?.[JWT_CLAIMS]?.roles ?? [],
    },
  })

  registerRootStore(store)

  // For SSG and SSR always create a new store
  if (isServer) {
    _store = store

    return _store
  }

  // Create the store once in the client
  if (!_store) {
    _store = store
  }

  // if (process.env.NODE_ENV === 'development') {
  //   ;(window as any).store = store
  // }

  return store
}
