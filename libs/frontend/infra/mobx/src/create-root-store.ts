import type {
  IRootStore,
  RootStoreData,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  builderServiceContext,
  componentServiceContext,
  elementServiceContext,
  renderServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AppService } from '@codelab/frontend/application/app'
import { ElementApplicationService } from '@codelab/frontend/application/element'
import { AdminService } from '@codelab/frontend/domain/admin'
import { AtomService, atomServiceContext } from '@codelab/frontend/domain/atom'
import { BuilderService } from '@codelab/frontend/domain/builder'
import { ComponentService } from '@codelab/frontend/domain/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/domain/domain'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import { PropService, propServiceContext } from '@codelab/frontend/domain/prop'
import { RenderService } from '@codelab/frontend/domain/renderer'
import {
  ResourceService,
  resourceServiceContext,
} from '@codelab/frontend/domain/resource'
import {
  ActionService,
  actionServiceContext,
  StoreService,
  storeServiceContext,
} from '@codelab/frontend/domain/store'
import { TagService, tagServiceContext } from '@codelab/frontend/domain/tag'
import {
  FieldService,
  fieldServiceContext,
  TypeService,
  typeServiceContext,
} from '@codelab/frontend/domain/type'
import { UserService } from '@codelab/frontend/domain/user'
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
      componentService: prop(() => new ComponentService({})),
      domainService: prop(() => new DomainService({})),
      elementApplicationService: prop(() => new ElementApplicationService({})),
      elementService: prop(() => new ElementService({})),
      fieldService: prop(() => new FieldService({})),
      pageService: prop(() => new PageService({})),
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
    protected onInit() {
      appServiceContext.set(this, this.appService)
      domainServiceContext.set(this, this.domainService)
      pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      actionServiceContext.set(this, this.actionService)
      storeServiceContext.set(this, this.storeService)
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
