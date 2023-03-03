import type {
  IActionService,
  IAtomService,
  IComponentService,
  IElementService,
  IElementTree,
  IFieldService,
  IPropService,
  IRenderer,
  IStoreService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import {
  componentServiceContext,
  elementServiceContext,
} from '@codelab/frontend/abstract/core'
import { atomServiceContext } from '@codelab/frontend/domain/atom'
import { propServiceContext } from '@codelab/frontend/domain/prop'
import { actionServiceContext } from '@codelab/frontend/domain/store'
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
    componentService: prop<IComponentService>(),
    elementService: prop<IElementService>(),
    fieldService: prop<IFieldService>(),
    pageElementTree: prop<IElementTree>(),
    propService: prop<IPropService>(),
    renderer: prop<IRenderer>(),
    storeService: prop<IStoreService>(),
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

    registerRootStore(this)
  }
}
