import type {
  IActionService,
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
  builderServiceContext,
  componentServiceContext,
  elementServiceContext,
  renderServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/domain'
import { atomServiceContext } from '@codelab/frontend/domain/atom'
import { BuilderService } from '@codelab/frontend/domain/builder'
import { pageServiceContext } from '@codelab/frontend/domain/page'
import { propServiceContext } from '@codelab/frontend/domain/prop'
import {
  actionServiceContext,
  storeServiceContext,
} from '@codelab/frontend/domain/store'
import { tagServiceContext } from '@codelab/frontend/domain/tag'
import {
  fieldServiceContext,
  typeServiceContext,
} from '@codelab/frontend/domain/type'
import { User, UserService } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import type { ITestRootStore } from './test-root-store.interface'

@model('@codelab/TestRootStore')
export class TestRootStore
  extends Model({
    actionService: prop<IActionService>(),
    atomService: prop<IAtomService>(),
    builderService: prop(() => new BuilderService({})),
    componentService: prop<IComponentService>(),
    elementService: prop<IElementService>(),
    fieldService: prop<IFieldService>(),
    pageService: prop<IPageService>(),
    propService: prop<IPropService>(),
    renderService: prop<IRenderService>(),
    storeService: prop<IStoreService>(),
    tagService: prop<ITagService>(),
    typeService: prop<ITypeService>(),
    userService: prop<IUserService>(
      () => new UserService({ user: User.create(userDto) }),
    ),
  })
  implements ITestRootStore
{
  public clear() {
    this.typeService.types.clear()
    this.atomService.atoms.clear()
    this.componentService.components.clear()
    this.elementService.elementDomainService.elements.clear()
    this.fieldService.fields.clear()
    this.actionService.actions.clear()
    this.propService.props.clear()
    this.pageService.pages.clear()
    this.storeService.stores.clear()
    this.tagService.tags.clear()
    this.userService.users.clear()
    this.renderService.renderers.clear()
  }

  protected override onInit() {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    builderServiceContext.set(this, this.builderService)
    componentServiceContext.set(this, this.componentService)
    elementServiceContext.set(this, this.elementService)
    fieldServiceContext.set(this, this.fieldService)
    actionServiceContext.set(this, this.actionService)
    propServiceContext.set(this, this.propService)
    pageServiceContext.set(this, this.pageService)
    storeServiceContext.set(this, this.storeService)
    tagServiceContext.set(this, this.tagService)
    renderServiceContext.set(this, this.renderService)
    userServiceContext.set(this, this.userService)

    registerRootStore(this)
  }
}
