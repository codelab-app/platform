import { IRootStore, RootStoreData } from '@codelab/frontend/abstract/core'
import { AdminService } from '@codelab/frontend/domain/admin'
import { AppService, appServiceContext } from '@codelab/frontend/domain/app'
import { AtomService, atomServiceContext } from '@codelab/frontend/domain/atom'
import { BuilderService } from '@codelab/frontend/domain/builder'
import { ComponentService } from '@codelab/frontend/domain/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/domain/domain'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import { RenderService } from '@codelab/frontend/domain/renderer'
import {
  ResourceService,
  resourceServiceContext,
} from '@codelab/frontend/domain/resource'
import {
  ActionService,
  actionServiceContext,
  StoreService,
} from '@codelab/frontend/domain/store'
import { TagService, tagServiceContext } from '@codelab/frontend/domain/tag'
import { TypeService, typeServiceContext } from '@codelab/frontend/domain/type'
import { UserService, userServiceContext } from '@codelab/frontend/domain/user'
import {
  componentServiceContext,
  elementServiceContext,
  storeServiceContext,
} from '@codelab/frontend/presenter/container'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = ({ user }: RootStoreData) => {
  @model('@codelab/RootStore')
  class RootStore extends Model({
    userService: prop(() => UserService.init(user)).withSetter(),
    appService: prop(() => new AppService({})),
    pageService: prop(() => new PageService({})),
    typeService: prop(() => new TypeService({})),
    atomService: prop(() => new AtomService({})),
    tagService: prop(() => new TagService({})),
    adminService: prop(() => new AdminService({})),
    componentService: prop(() => new ComponentService({})),
    appRenderService: prop(() => new RenderService({})),
    builderRenderService: prop(() => new RenderService({})),
    actionService: prop(() => new ActionService({})),
    storeService: prop(() => new StoreService({})),
    resourceService: prop(() => new ResourceService({})),
    elementService: prop(() => new ElementService({})),
    builderService: prop(() => new BuilderService({})),
    domainService: prop(() => new DomainService({})),
  }) {
    protected onInit(): void {
      appServiceContext.set(this, this.appService)
      domainServiceContext.set(this, this.domainService)
      pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, this.typeService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      actionServiceContext.set(this, this.actionService)
      storeServiceContext.set(this, this.storeService)
      resourceServiceContext.set(this, this.resourceService)
      elementServiceContext.set(this, this.elementService)
      userServiceContext.set(this, this.userService)
      tagServiceContext.set(this, this.tagService)
    }
  }

  // if (!init) {
  //   return
  // }

  return new RootStore({}) as IRootStore
}
