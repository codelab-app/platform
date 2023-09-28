import type {
  IActionService,
  IAtomService,
  IComponentService,
  IElementService,
  IFieldService,
  IPageService,
  IPropService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  componentServiceContext,
  elementServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/core'
import { AtomService, atomServiceContext } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { PageService, pageServiceContext } from '@codelab/frontend/domain/page'
import { PropService, propServiceContext } from '@codelab/frontend/domain/prop'
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
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { ElementService } from '../store'

export const createTestRootStore = (user: IUserDTO) => {
  @model('@codelab/TestRootStore')
  class TestRootStore extends Model({
    actionService: prop<IActionService>(() => new ActionService({})),
    atomService: prop<IAtomService>(() => new AtomService({})),
    componentService: prop<IComponentService>(() => new ComponentService({})),
    elementService: prop<IElementService>(() => new ElementService({})),
    fieldService: prop<IFieldService>(() => new FieldService({})),
    pageService: prop<IPageService>(() => new PageService({})),
    propService: prop<IPropService>(() => new PropService({})),
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

      registerRootStore(this)
    }
  }

  const rootStore = new TestRootStore({})

  // mockRepository(rootStore.appService.appRepository)

  jest
    .spyOn(rootStore.atomService, 'getDefaultElementRenderType')
    .mockImplementation()

  return rootStore
}
