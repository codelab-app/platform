import type { IModalService } from '@codelab/frontend/abstract/core'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { Router } from 'next/router'

@model('@codelab/InlineFormService')
export class InlineFormService<
    TMetadata = undefined,
    Properties extends object = Record<string, unknown>,
  >
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TMetadata,
  >() => ({
    isOpen: prop<boolean>(false),
    metadata: prop<TMetadata | null>(null),
  }))<TMetadata>
  implements IModalService<TMetadata>
{
  onAttachedToRootStore() {
    const closeModalOnRouteChange = () => this.close()

    Router.events.on('routeChangeStart', closeModalOnRouteChange)

    return () => {
      Router.events.off('routeChangeStart', closeModalOnRouteChange)
    }
  }

  @modelAction
  open(...args: TMetadata extends undefined ? [] : [TMetadata]) {
    this.isOpen = true

    if (args.length > 0) {
      this.metadata = args[0] ?? null
    }
  }

  @modelAction
  close() {
    this.isOpen = false
    this.metadata = null
  }
}
