import {
  appServiceContext,
  builderServiceContext,
  componentServiceContext,
  elementServiceContext,
  renderServiceContext,
  resourceServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import { atomDomainServiceContext } from '@codelab/frontend/abstract/domain'
import { AdminService } from '@codelab/frontend/application/admin'
import { AppService } from '@codelab/frontend/application/app'
import {
  AtomService,
  atomServiceContext,
} from '@codelab/frontend/application/atom'
import { BuilderService } from '@codelab/frontend/application/builder'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/application/domain'
import {
  ElementApplicationService,
  ElementService,
} from '@codelab/frontend/application/element'
import {
  PageApplicationService,
  pageServiceContext,
} from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import { RenderService } from '@codelab/frontend/application/renderer'
import { ResourceService } from '@codelab/frontend/application/resource'
import type {
  IRootStore,
  RootStoreData,
} from '@codelab/frontend/application/shared/store'
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
import { storeDomainServiceContext } from '@codelab/frontend/domain/store'
import { typeDomainServiceContext } from '@codelab/frontend/domain/type'
import {
  TracerService,
  tracerServiceContext,
} from '@codelab/frontend/infra/otel'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = ({ user }: RootStoreData) => {
  @model('@codelab/RootStore')
  class RootStore
    extends Model({
      actionService: prop(() => new ActionService({})),
      adminService: prop(() => new AdminService({})),
      appService: prop(() => new AppService({})),
      atomService: prop(() => new AtomService({})),
      builderService: prop(() => new BuilderService({})),
      componentService: prop(() => new ComponentApplicationService({})),
      domainService: prop(() => new DomainService({})),
      elementApplicationService: prop(() => new ElementApplicationService({})),
      elementService: prop(() => new ElementService({})),
      fieldService: prop(() => new FieldService({})),
      pageService: prop(() => new PageApplicationService({})),
      propService: prop(() => new PropService({})),
      renderService: prop(() => new RenderService({})),
      resourceService: prop(() => new ResourceService({})),
      storeService: prop(() => new StoreService({})),
      tagService: prop(() => new TagService({})),
      tracerService: prop(() => new TracerService({})),
      typeService: prop(() => new TypeService({})),
      userService: prop(() => UserService.init(user)),
    })
    implements IRootStore
  {
    public clear() {
      this.typeService.typeDomainService.types.clear()
      this.appService.appDomainService.apps.clear()
      this.atomService.atomDomainService.atoms.clear()
      this.componentService.components.clear()
      this.elementService.elementDomainService.elements.clear()
      this.fieldService.fields.clear()
      this.actionService.actions.clear()
      this.storeService.storeDomainService.stores.clear()
      this.tagService.tags.clear()
      this.userService.users.clear()
      this.renderService.renderers.clear()
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
      builderServiceContext.set(this, this.builderService)
      userServiceContext.set(this, this.userService)
      tagServiceContext.set(this, this.tagService)
      fieldServiceContext.set(this, this.fieldService)
      renderServiceContext.set(this, this.renderService)
      tracerServiceContext.set(this, this.tracerService)
    }
  }

  return new RootStore({}) as IRootStore
}
