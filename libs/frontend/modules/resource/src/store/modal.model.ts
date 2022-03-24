import { Model, model, modelAction, prop, tProp, types, rootRef, detach } from 'mobx-keystone'

@model('codelab/Modal')
// eslint-disable-next-line @typescript-eslint/no-shadow
export class Modal<T> extends Model(<T>() => ({
  isOpen: tProp(types.boolean, false),
  record: prop<T | undefined>(undefined),
}))<T> {
  @modelAction
  open() {
    console.log('open')
    this.isOpen = true
  }

  @modelAction
  close() {
    this.isOpen = false
  }
}
