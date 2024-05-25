import type { IModalService } from '@codelab/frontend/abstract/application'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('@codelab/ModalService')
export class ModalService<TMetadata extends object>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TMetadata,
  >() => ({
    isOpen: prop<boolean>(false),
    metadata: prop<TMetadata | undefined>(undefined),
  }))<TMetadata>
  implements IModalService<TMetadata>
{
  @modelAction
  close() {
    this.isOpen = false
    this.metadata = undefined

    // Router.events.off('routeChangeStart', this.closeOnRouteChange)
  }

  @modelAction
  open(metadata: TMetadata) {
    this.isOpen = true
    this.metadata = metadata

    // Router.events.on('routeChangeStart', this.closeOnRouteChange)
  }

  closeOnRouteChange = () => this.close()
}
