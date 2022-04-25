import { AtomService, atomServiceContext } from '@codelab/frontend/modules/atom'
import {
  ComponentService,
  componentServiceContext,
} from '@codelab/frontend/modules/component'
import { ElementService } from '@codelab/frontend/modules/element'
import { TypeService, typeServiceContext } from '@codelab/frontend/modules/type'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { RenderService } from '../../render.service'
import { renderServiceContext } from '../../renderServiceContext'

@model('@codelab/RenderTestRootStore')
export class RenderTestRootStore extends Model({
  typeService: prop<TypeService>(),
  atomService: prop<AtomService>(),
  elementService: prop<ElementService>(),
  renderService: prop<RenderService>(),
  componentService: prop<ComponentService>(),
}) {
  protected override onInit(): void {
    typeServiceContext.set(this, this.typeService)
    atomServiceContext.set(this, this.atomService)
    componentServiceContext.set(this, this.componentService)
    renderServiceContext.set(this, this.renderService)
    registerRootStore(this)
  }
}
