import type {
  IActionService,
  IAppService,
  IAtomService,
  IComponentService,
  IElementService,
  IFieldService,
  IPageService,
  IPropService,
  IRenderService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/domain'
import {
  componentServiceContext,
  elementServiceContext,
  renderServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AtomService, atomServiceContext } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService } from '@codelab/frontend/domain/element'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import { PropService, propServiceContext } from '@codelab/frontend/domain/prop'
import { RenderService } from '@codelab/frontend/domain/renderer'
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
import { User, UserService } from '@codelab/frontend/domain/user'
import { mockRepository } from '@codelab/frontend/test/store'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { AppService } from '../services'

export const createTestRootStore = (user: IUserDTO) => {
  @model('@codelab/TestRootStore')
  class TestRootStore extends Model({
    actionService: prop<IActionService>(() => new ActionService({})),
    appService: prop<IAppService>(() => new AppService({})),
    atomService: prop<IAtomService>(() => new AtomService({})),
    componentService: prop<IComponentService>(() => new ComponentService({})),
    elementService: prop<IElementService>(() => new ElementService({})),
    fieldService: prop<IFieldService>(() => new FieldService({})),
    pageService: prop<IPageService>(() => new PageService({})),
    propService: prop<IPropService>(() => new PropService({})),
    renderService: prop<IRenderService>(() => new RenderService({})),
    storeService: prop<IStoreService>(() => new StoreService({})),
    tagService: prop<ITagService>(() => new TagService({})),
    typeService: prop<ITypeService>(() => new TypeService({})),
    userService: prop<IUserService>(
      () => new UserService({ user: User.create(user) }),
    ),
  }) {
    protected override onInit() {
      typeServiceContext.set(this, this.typeService)
      userServiceContext.set(this, this.userService)
      atomServiceContext.set(this, this.atomService)
      componentServiceContext.set(this, this.componentService)
      elementServiceContext.set(this, this.elementService)
      fieldServiceContext.set(this, this.fieldService)
      actionServiceContext.set(this, this.actionService)
      propServiceContext.set(this, this.propService)
      pageServiceContext.set(this, this.pageService)
      storeServiceContext.set(this, this.storeService)
      tagServiceContext.set(this, this.tagService)
      tagServiceContext.set(this, this.tagService)
      renderServiceContext.set(this, this.renderService)

      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  mockRepository(rootStore.appService.appRepository)

  return rootStore
}
