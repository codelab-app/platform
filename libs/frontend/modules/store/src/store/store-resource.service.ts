import { ModalService } from '@codelab/frontend/shared/utils'
import { Model, model, prop } from 'mobx-keystone'
import { StoreResourceModalService } from './store-resource-modal.service'

export type WithStoreResourceService = {
  storeResourceService: StoreResourceService
}

@model('@codelab/StoreService')
export class StoreResourceService extends Model({
  createModal: prop(() => new ModalService({})),
  deleteModal: prop(() => new StoreResourceModalService({})),
}) {}
