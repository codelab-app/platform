import { IRootStore, RootStoreData } from '@codelab/frontend/abstract/core'
import { AdminService } from '@codelab/frontend/domain/admin'
import { AppService } from '@codelab/frontend/domain/app'
import {
  AtomService,
  atomServiceContext,
  atomServiceRef,
} from '@codelab/frontend/domain/atom'
import { BuilderService } from '@codelab/frontend/domain/builder'
import {
  ComponentService,
  componentServiceRef,
} from '@codelab/frontend/domain/component'
import {
  DomainService,
  domainServiceContext,
} from '@codelab/frontend/domain/domain'
import {
  ElementService,
  elementServiceRef,
} from '@codelab/frontend/domain/element'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import { PropService, propServiceRef } from '@codelab/frontend/domain/prop'
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
import {
  TypeService,
  typeServiceContext,
  typeServiceRef,
} from '@codelab/frontend/domain/type'
import { User, UserService } from '@codelab/frontend/domain/user'
import {
  componentServiceContext,
  elementServiceContext,
  storeServiceContext,
} from '@codelab/frontend/presenter/container'
import { Model, model, prop } from 'mobx-keystone'

export const createRootStore = ({ user }: RootStoreData) => {
  const propService = new PropService({})
  const atomService = new AtomService({})

  const elementService = new ElementService({
    // _atomService: atomServiceRef(atomService),
  })

  const typeService = new TypeService({
    // _propService: propServiceRef(propService),
    // _elementService: elementServiceRef(elementService),
  })

  const pageService = new PageService({})

  const storeService = new StoreService({
    _typeService: typeServiceRef(typeService),
  })

  const appService = new AppService({
    _elementService: elementServiceRef(elementService),
    pageService,
    storeService,
  })

  const userService = new UserService({
    user: user ? User.hydrate(user) : null,
    appService,
    typeService,
  })

  const componentService = new ComponentService({})

  @model('@codelab/RootStore')
  class RootStore extends Model({
    userService: prop(() => userService).withSetter(),
    // typeService: prop(() => typeService),
    atomService: prop(() => new AtomService({})),
    tagService: prop(() => new TagService({})),
    // propService: prop(() => propService),
    adminService: prop(() => new AdminService({})),
    componentService: prop(() => componentService),
    appRenderService: prop(
      () =>
        new RenderService({
          _elementService: elementServiceRef(elementService),
          _componentService: componentServiceRef(componentService),
        }),
    ),
    builderRenderService: prop(
      () =>
        new RenderService({
          _elementService: elementServiceRef(elementService),
          _componentService: componentServiceRef(componentService),
        }),
    ),
    actionService: prop(() => new ActionService({})),
    // storeService: prop(() => storeService),
    resourceService: prop(() => new ResourceService({})),
    elementService: prop(() => elementService),
    builderService: prop(() => new BuilderService({ atomService })),
    domainService: prop(() => new DomainService({})),
  }) {
    protected onInit(): void {
      // appServiceContext.set(this, this.appService)
      domainServiceContext.set(this, this.domainService)
      // pageServiceContext.set(this, this.pageService)
      typeServiceContext.set(this, typeService)
      // propServiceContext.set(this, this.propService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      actionServiceContext.set(this, this.actionService)
      // storeServiceContext.set(this, this.storeService)
      resourceServiceContext.set(this, this.resourceService)
      elementServiceContext.set(this, this.elementService)
      tagServiceContext.set(this, this.tagService)
    }
  }

  return new RootStore({}) as IRootStore
}
