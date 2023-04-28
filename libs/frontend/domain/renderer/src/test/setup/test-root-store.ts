import type {
  IActionService,
  IAppService,
  IAtomService,
  IComponentService,
  IElementService,
  IFieldService,
  IPageService,
  IPropService,
  IRenderer,
  IRenderService,
  IStoreService,
  ITagService,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import {
  appServiceContext,
  builderRenderServiceContext,
  componentServiceContext,
  elementServiceContext,
  userServiceContext,
} from '@codelab/frontend/abstract/core'
import { atomServiceContext } from '@codelab/frontend/domain/atom'
import { pageServiceContext } from '@codelab/frontend/domain/page'
import { propServiceContext } from '@codelab/frontend/domain/prop'
import {
  actionServiceContext,
  storeServiceContext,
} from '@codelab/frontend/domain/store'
import {
  fieldServiceContext,
  typeServiceContext,
} from '@codelab/frontend/domain/type'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import type { ITestRootStore } from './test-root-store.interface'

@model('@codelab/TestRootStore')
export class TestRootStore
  extends Model({
    actionService: prop<IActionService>(),
    appService: prop<IAppService>(),
    atomService: prop<IAtomService>(),
    builderRenderService: prop<IRenderService>(),
    componentService: prop<IComponentService>(),
    elementService: prop<IElementService>(),
    fieldService: prop<IFieldService>(),
    pageService: prop<IPageService>(),
    propService: prop<IPropService>(),
    renderer: prop<Nullable<IRenderer>>(null).withSetter(),
    storeService: prop<IStoreService>(),
    tagService: prop<ITagService>(),
    typeService: prop<ITypeService>(),
    userService: prop<IUserService>(),
  })
  implements ITestRootStore
{
  protected override onInit() {
    userServiceContext.set(this, this.userService)
    appServiceContext.set(this, this.appService)
    pageServiceContext.set(this, this.pageService)
    atomServiceContext.set(this, this.atomService)
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    componentServiceContext.set(this, this.componentService)
    elementServiceContext.set(this, this.elementService)
    fieldServiceContext.set(this, this.fieldService)
    actionServiceContext.set(this, this.actionService)
    propServiceContext.set(this, this.propService)
    storeServiceContext.set(this, this.storeService)
    builderRenderServiceContext.set(this, this.builderRenderService)

    registerRootStore(this)
  }
}
