import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import { ComponentService } from '@codelab/frontend/modules/component'
import { ElementService, ElementTree } from '@codelab/frontend/modules/element'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import { componentServiceContext } from '@codelab/frontend/presenter/container'
import {
  IElementTree,
  IRenderer,
  IRootStore,
} from '@codelab/shared/abstract/core'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { Renderer } from '../../renderer.model'

export type IRenderTestRootStore = {
  /**
   * We only use a single renderer for testing
   */
  renderer: IRenderer
  pageElementTree: IElementTree
} & Pick<
  IRootStore,
  'typeService' | 'atomService' | 'elementService' | 'componentService'
>

@model('@codelab/RenderTestRootStore')
export class RenderTestRootStore
  extends Model({
    typeService: prop<TypeService>(),
    atomService: prop<AtomService>(),
    elementService: prop<ElementService>(),
    pageElementTree: prop<ElementTree>(),
    renderer: prop<Renderer>(),
    componentService: prop<ComponentService>(),
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
