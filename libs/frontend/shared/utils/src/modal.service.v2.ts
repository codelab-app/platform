import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('codelab/ModelServiceV2')
export class ModalServiceV2<TMetadata = never> extends Model(<
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TMetadata,
>() => ({
  isOpen: prop<boolean>(() => false),
  metadata: prop<TMetadata | null>(() => null),
}))<TMetadata> {
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
