import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'

@model('@codelab/RuntimeElement')
export class RuntimeElement extends Model({}) {
  @modelFlow
  @transaction
  _demo = _async(function* (this: RuntimeElement) {
    return
  })
}
