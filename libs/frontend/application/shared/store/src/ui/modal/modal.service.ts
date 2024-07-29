import type { IModalService } from '@codelab/frontend/abstract/application'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('@codelab/ModalService')
export class ModalService<TMetadata extends object>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TMetadata,
  >() => ({
    data: prop<TMetadata | undefined>(undefined),
    isOpen: prop<boolean>(false),
  }))<TMetadata>
  implements IModalService<TMetadata>
{
  @modelAction
  close() {
    this.isOpen = false
    this.data = undefined

    // Router.events.off('routeChangeStart', this.closeOnRouteChange)
  }

  @modelAction
  open(data: TMetadata) {
    this.isOpen = true
    this.data = data

    // Router.events.on('routeChangeStart', this.closeOnRouteChange)
  }

  closeOnRouteChange = () => {
    this.close()
  }
}
