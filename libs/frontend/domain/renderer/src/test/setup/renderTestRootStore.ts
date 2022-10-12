import {
  IAtomService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  IRootStore,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { AtomService, atomServiceContext } from '@codelab/frontend/domain/atom'
import { ComponentService } from '@codelab/frontend/domain/component'
import { ElementService, ElementTree } from '@codelab/frontend/domain/element'
import { TypeService, typeServiceContext } from '@codelab/frontend/domain/type'
import { componentServiceContext } from '@codelab/frontend/presenter/container'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

export type IRenderTestRootStore = {
  /**
   * We only use a single renderer for testing
   */
  renderer: IRenderer
  pageElementTree: IElementTree
} & Pick<IRootStore, 'atomService' | 'elementService' | 'componentService'>

@model('@codelab/RenderTestRootStore')
export class RenderTestRootStore
  extends Model({
    typeService: prop<ITypeService>(),
    atomService: prop<IAtomService>(),
    elementService: prop<IElementService>(),
    pageElementTree: prop<IElementTree>(),
    renderer: prop<IRenderer>(),
    componentService: prop<IComponentService>(),
  })
  implements IRenderTestRootStore
{
  protected override onInit(): void {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    componentServiceContext.set(this, this.componentService)

    registerRootStore(this)
  }
}
