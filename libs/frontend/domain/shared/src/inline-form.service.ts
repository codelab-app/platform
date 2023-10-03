<<<<<<< HEAD
import type { IFormService } from '@codelab/frontend/abstract/application'
=======
import type { IModalService } from '@codelab/frontend/abstract/domain'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { Router } from 'next/router'

@model('@codelab/InlineFormService')
export class InlineFormService<TMetadata extends object = object>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TMetadata,
  >() => ({
    isOpen: prop<boolean>(false),
    metadata: prop<TMetadata | undefined>(undefined),
  }))<TMetadata>
  implements IFormService<TMetadata>
{
  @modelAction
  close() {
    this.isOpen = false
    this.metadata = undefined

    Router.events.off('routeChangeStart', this.closeOnRouteChange)
  }

  @modelAction
  open(metadata: TMetadata) {
    this.isOpen = true
    this.metadata = metadata

    Router.events.on('routeChangeStart', this.closeOnRouteChange)
  }

  closeOnRouteChange = () => this.close()
}
