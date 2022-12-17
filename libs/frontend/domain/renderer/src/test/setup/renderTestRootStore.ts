import type {
  IAtomService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  IRootStore,
  IStoreService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { atomServiceContext } from '@codelab/frontend/domain/atom'
import { typeServiceContext } from '@codelab/frontend/domain/type'
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
    storeService: prop<IStoreService>(),
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
