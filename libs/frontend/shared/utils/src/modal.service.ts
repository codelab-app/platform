import { IModalService } from '@codelab/shared/abstract/core'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('codelab/ModelService')
export class ModalService<TMetadata = never>
  extends Model(<
    // eslint-disable-next-line @typescript-eslint/no-shadow
    TMetadata,
  >() => ({
    isOpen: prop<boolean>(() => false),
    metadata: prop<TMetadata | null>(() => null),
  }))<TMetadata>
  implements IModalService<TMetadata>
{
  @modelAction
  open(...args: TMetadata extends never ? [] : [TMetadata]) {
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
