import type {
  IActionService,
  IAppService,
  IAtomService,
  IComponentApplicationService,
  IElementService,
  IFieldService,
  IPageApplicationService,
  IPropService,
  IRenderService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/application'
import {
  appServiceContext,
  componentServiceContext,
  elementServiceContext,
  renderServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/application'
import { atomServiceContext } from '@codelab/frontend/application/atom'
import { pageServiceContext } from '@codelab/frontend/application/page'
import { propServiceContext } from '@codelab/frontend/application/prop'
import {
  actionServiceContext,
  storeServiceContext,
} from '@codelab/frontend/application/store'
import { tagServiceContext } from '@codelab/frontend/application/tag'
import {
  fieldServiceContext,
  typeServiceContext,
} from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
import { User } from '@codelab/frontend/domain/user'
import { userDto } from '@codelab/frontend/test/data'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import type { ITestRootStore } from './test-root-store.interface'

@model('@codelab/TestRootStore')
export class TestRootStore
  extends Model({
    actionService: prop<IActionService>(),
    appService: prop<IAppService>(),
    atomService: prop<IAtomService>(),
    // builderService: prop(() => new BuilderService({})),
    componentService: prop<IComponentApplicationService>(),
    elementService: prop<IElementService>(),
    fieldService: prop<IFieldService>(),
    pageService: prop<IPageApplicationService>(),
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
    this.appService.appDomainService.apps.clear()
    this.typeService.typeDomainService.types.clear()
    this.atomService.atomDomainService.atoms.clear()
    this.componentService.components.clear()
    this.elementService.elementDomainService.elements.clear()
    this.fieldService.fields.clear()
    this.actionService.actions.clear()
    this.propService.props.clear()
    this.storeService.storeDomainService.stores.clear()
    this.tagService.tags.clear()
    this.userService.users.clear()
    this.renderService.renderers.clear()
  }

  protected override onInit() {
    appServiceContext.set(this, this.appService)
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
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
