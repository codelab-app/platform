import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import { ElementService } from '@codelab/frontend/modules/element'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { renderContext } from '../../renderContext'
import { RenderService } from '../../RenderService'

@model('codelab/RenderTestRootStore')
export class RenderTestRootStore extends Model({
  typeService: prop<TypeService>(),
  atomService: prop<AtomService>(),
  elementService: prop<ElementService>(),
  renderService: prop<RenderService>(),
}) {
  protected override onInit(): void {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    renderContext.set(this, this.renderService)

    this.renderService.initForce(this.elementService.elementTree)

    registerRootStore(this)
  }
}
