import { AdminService } from '@codelab/frontend/modules/admin'
import { AppService, appServiceContext } from '@codelab/frontend/modules/app'
import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import {
  BuilderService,
  RenderService,
} from '@codelab/frontend/modules/builder'
import { ComponentService } from '@codelab/frontend/modules/component'
import { ElementService, ElementTree } from '@codelab/frontend/modules/element'
import { PageService, pageServiceContext } from '@codelab/frontend/modules/page'
import {
  OperationService,
  operationServiceContext,
  ResourceService,
  resourceServiceContext,
} from '@codelab/frontend/modules/resource'
import {
  ActionService,
  actionServiceContext,
  StoreService,
} from '@codelab/frontend/modules/store'
import { TagService } from '@codelab/frontend/modules/tag'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import { UserService, userServiceContext } from '@codelab/frontend/modules/user'
import {
  componentServiceContext,
  elementServiceContext,
} from '@codelab/frontend/presenter/container'
import {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IOperationService,
  IPageService,
  IRenderService,
  IResourceService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserDTO,
  IUserService,
} from '@codelab/shared/abstract/core'
import { Model, model, prop } from 'mobx-keystone'

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
  atomService: IAtomService
  tagService: ITagService
  adminService: IAdminService
  componentService: IComponentService
  actionService: IActionService
  storeService: IStoreService
  /**
   * We use a single elementService to hold all elements
   */
  elementService: IElementService
  /**
   * Each tree will have it's own elementTree
   */
  pageElementTree: IElementTree
  providerElementTree: IElementTree

  /**
   * Our builder view has page & component tree view, so we would need 2 instances of the builder
   */
  builderService: IBuilderService
  /**
   * We have a pageBuilder specific renderer that overrides some onClick methods
   */
  pageBuilderRenderService: IRenderService
  /**
   * Since page and component tree are used simultaneously, we should keep a separate copy for components, as opposed to re-initializing new render services on switching the tree view
   */
  componentBuilderRenderService: IRenderService
  /**
   * And a page specific renderer for serving client apps to customers
   */
  pageRenderService: IRenderService

  resourceService: IResourceService
  operationService: IOperationService
}

export const createRootStore = (
  { user }: RootStoreData,
  props?: Partial<IRootStore>,
) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      userService: prop(() => props?.userService ?? UserService.init(user)),
      appService: prop(() => props?.appService ?? new AppService({})),
      pageService: prop(() => props?.pageService ?? new PageService({})),
      typeService: prop(() => props?.typeService ?? new TypeService({})),
      atomService: prop(() => props?.atomService ?? new AtomService({})),
      tagService: prop(() => props?.tagService ?? new TagService({})),
      adminService: prop(() => props?.adminService ?? new AdminService({})),
      componentService: prop(
        () => props?.componentService ?? new ComponentService({}),
      ),
      actionService: prop(() => props?.actionService ?? new ActionService({})),
      storeService: prop(() => props?.storeService ?? new StoreService({})),
      resourceService: prop(
        () => props?.resourceService ?? new ResourceService({}),
      ),
      operationService: prop(
        () => props?.operationService ?? new OperationService({}),
      ),
      // default regular service that holds the element tree
      elementService: prop(
        () => props?.elementService ?? new ElementService({}),
      ),
      pageElementTree: prop(
        () => props?.pageElementTree ?? new ElementTree({}),
      ),
      // element service that is used by the provider tree
      providerElementTree: prop(
        () => props?.providerElementTree ?? new ElementTree({}),
      ),
      builderService: prop(
        () => props?.builderService ?? new BuilderService({}),
      ),
      /*
       * This is the default render service used for rendering apps.
       * do not confuse it with the builder-specific render service in builderService.builderRenderer
       */
      pageRenderService: prop(
        () => props?.pageRenderService ?? new RenderService({}),
      ),
      pageBuilderRenderService: prop(
        () => props?.pageBuilderRenderService ?? new RenderService({}),
      ),
      componentBuilderRenderService: prop(
        () => props?.componentBuilderRenderService ?? new RenderService({}),
      ),
    })
    implements IRootStore
  {
    protected onInit(): void {
      appServiceContext.set(this, this.appService)
      pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      actionServiceContext.set(this, this.actionService)
      resourceServiceContext.set(this, this.resourceService)
      operationServiceContext.set(this, this.operationService)
      elementServiceContext.set(this, this.elementService)
      userServiceContext.set(this, this.userService)
      pageServiceContext.set(this, this.pageService)
    }
  }

  return new RootStore(props ?? ({} as any)) as IRootStore
}
