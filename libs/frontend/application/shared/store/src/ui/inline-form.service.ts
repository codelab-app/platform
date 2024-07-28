import type { IToggleService } from '@codelab/frontend/abstract/application'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('@codelab/InlineFormService')
export class InlineFormService<TData = undefined>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TData,
  >() => ({
    data: prop<TData | undefined>(undefined),
    isOpen: prop<boolean>(false),
  }))<TData>
  implements IToggleService<TData>
{
  @modelAction
  close() {
    this.isOpen = false
    this.data = undefined

    // Router.events.off('routeChangeStart', this.closeOnRouteChange)
  }

  @modelAction
  open(metadata: TData) {
    this.isOpen = true
    this.data = metadata

    // Router.events.on('routeChangeStart', this.closeOnRouteChange)
  }

  closeOnRouteChange = () => {
    this.close()
  }
}
