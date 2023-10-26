import type {
  IActionService,
  IAdminService,
  IAppService,
  IAtomService,
  IComponentApplicationService,
  IDomainService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRendererApplicationService,
  IResourceService,
  IRootStore,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
  RootStoreData,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  componentServiceContext,
  elementServiceContext,
  rendererServiceContext,
  resourceServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import {
  atomDomainServiceContext,
  builderDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AdminService } from '@codelab/frontend/application/admin'
import { AppService } from '@codelab/frontend/application/app'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/application/domain'
import { ElementService } from '@codelab/frontend/application/element'
import {
  PageApplicationService,
  pageServiceContext,
} from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import { RendererApplicationService } from '@codelab/frontend/application/renderer'
import { ResourceService } from '@codelab/frontend/application/resource'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/application/store'
import {
  TagService,
  tagServiceContext,
} from '@codelab/frontend/application/tag'
import {
  FieldService,
  fieldServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
import { BuilderDomainService } from '@codelab/frontend/domain/builder'
import { storeDomainServiceContext } from '@codelab/frontend/domain/store'
import { typeDomainServiceContext } from '@codelab/frontend/domain/type'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = ({ user }: RootStoreData) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      actionService: prop<IActionService>(() => new ActionService({})),
      adminService: prop<IAdminService>(() => new AdminService({})),
      appService: prop<IAppService>(() => new AppService({})),
      atomService: prop<IAtomService>(() => new AtomService({})),
      builderService: prop<IBuilderDomainService>(
        () => new BuilderDomainService({}),
      ),
      componentService: prop<IComponentApplicationService>(
        () => new ComponentApplicationService({}),
      ),
      domainService: prop<IDomainService>(() => new DomainService({})),
      elementApplicationService: prop<IElementService>(
        () => new ElementService({}),
      ),
      elementService: prop<IElementService>(() => new ElementService({})),
      fieldService: prop<IFieldService>(() => new FieldService({})),
      pageService: prop<IPageApplicationService>(
        () => new PageApplicationService({}),
      ),
      propService: prop<IPropService>(() => new PropService({})),
      rendererService: prop<IRendererApplicationService>(
        () => new RendererApplicationService({}),
      ),
      resourceService: prop<IResourceService>(() => new ResourceService({})),
      storeService: prop<IStoreService>(() => new StoreService({})),
      tagService: prop<ITagService>(() => new TagService({})),
      typeService: prop<ITypeService>(() => new TypeService({})),
      userService: prop<IUserService>(() => UserService.init(user)),
    })
    implements IRootStore
  {
    public clear() {
      this.typeService.typeDomainService.types.clear()
      this.appService.appDomainService.apps.clear()
      this.atomService.atomDomainService.atoms.clear()
      this.componentService.componentDomainService.components.clear()
      this.elementService.elementDomainService.elements.clear()
      this.fieldService.fieldDomainService.fields.clear()
      this.actionService.actionDomainService.actions.clear()
      this.storeService.storeDomainService.stores.clear()
      this.tagService.tagDomainService.tags.clear()
      this.userService.userDomainService.users.clear()
      this.rendererService.renderers.clear()
    }

    protected onInit() {
      appServiceContext.set(this, this.appService)
      domainServiceContext.set(this, this.domainService)
      pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, this.typeService)
      typeDomainServiceContext.set(this, this.typeService.typeDomainService)
      atomServiceContext.set(this, this.atomService)
      atomDomainServiceContext.set(this, this.atomService.atomDomainService)
      componentServiceContext.set(this, this.componentService)
      storeDomainServiceContext.set(this, this.storeService.storeDomainService)
      actionServiceContext.set(this, this.actionService)
      storeServiceContext.set(this, this.storeService)
      storeDomainServiceContext.set(this, this.storeService.storeDomainService)
      resourceServiceContext.set(this, this.resourceService)
      propServiceContext.set(this, this.propService)
      elementServiceContext.set(this, this.elementService)
      builderDomainServiceContext.set(this, this.builderService)
      userServiceContext.set(this, this.userService)
      tagServiceContext.set(this, this.tagService)
      fieldServiceContext.set(this, this.fieldService)
      rendererServiceContext.set(this, this.rendererService)
    }
  }

  return new RootStore({}) as IRootStore
}
