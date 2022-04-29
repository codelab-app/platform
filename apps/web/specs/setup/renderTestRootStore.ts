import { AppService } from '@codelab/frontend/modules/app'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

@model('@codelab/RenderTestRootStore')
export class RenderTestRootStore extends Model({
  appService: prop<AppService>(),
  // typeService: prop<TypeService>(),
  // atomService: prop<AtomService>(),
  // elementService: prop<ElementService>(),
  // renderService: prop<RenderService>(),
  // componentService: prop<ComponentService>(),
}) {
  protected override onInit(): void {
    // appServiceContext.set(this, this.appService)
    // typeServiceContext.set(this, this.typeService)
    // atomServiceContext.set(this, this.atomService)
    // componentServiceContext.set(this, this.componentService)
    // renderServiceContext.set(this, this.renderService)
    registerRootStore(this)
  }
}
