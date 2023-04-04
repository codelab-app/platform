import type {
  IActionService,
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
} from '@codelab/frontend/abstract/core'
import {
  builderRenderServiceContext,
  componentServiceContext,
  elementServiceContext,
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
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import type { ITestRootStore } from './test-root-store.interface'

@model('@codelab/TestRootStore')
export class TestRootStore
  extends Model({
    actionService: prop<IActionService>(),
    atomService: prop<IAtomService>(),
    builderRenderService: prop<IRenderService>(),
    componentService: prop<IComponentService>(),
    elementService: prop<IElementService>(),
    fieldService: prop<IFieldService>(),
    pageService: prop<IPageService>(),
    propService: prop<IPropService>(),
    renderer: prop<IRenderer>().withSetter(),
    storeService: prop<IStoreService>(),
    tagService: prop<ITagService>(),
    typeService: prop<ITypeService>(),
  })
  implements ITestRootStore
{
  protected override onInit() {
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
