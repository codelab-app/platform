import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import {
  ExtendedModel,
  Model,
  model,
  modelClass,
  prop,
  Ref,
} from 'mobx-keystone'
import { Field, InterfaceType } from './models'

@model('codelab/FieldModalMetadata')
export class FieldModalMetadata extends Model({
  field: prop<Ref<Field>>(),
  interface: prop<Ref<InterfaceType>>(),
}) {}

@model('codelab/FieldModalService')
export class FieldModalService extends ExtendedModel(
  modelClass<ModalService<FieldModalMetadata>>(ModalService),
  {},
) {
  @computed
  get interface() {
    return this.metadata?.interface?.current ?? null
  }

  @computed
  get field() {
    return this.metadata?.field?.current ?? null
  }
}
