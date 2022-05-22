import { atomServiceContext } from '@codelab/frontend/modules/atom'
import { typeServiceContext } from '@codelab/frontend/modules/type'
import { componentServiceContext } from '@codelab/frontend/presenter/container'
import {
  IAtomService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

@model('@codelab/RenderTestRootStore')
export class RenderTestRootStore extends Model({
  typeService: prop<ITypeService>(),
  atomService: prop<IAtomService>(),
  pageElementTree: prop<IElementTree>(),
  elementService: prop<IElementService>(),
  renderService: prop<IRenderer>(),
  componentService: prop<IComponentService>(),
}) {
  protected override onInit(): void {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    componentServiceContext.set(this, this.componentService)

    registerRootStore(this)
  }
}
