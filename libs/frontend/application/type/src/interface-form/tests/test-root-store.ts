import type { IFieldService } from '@codelab/frontend/abstract/application'
import type { ITypeDomainService } from '@codelab/frontend/abstract/domain'
import { typeDomainServiceContext } from '@codelab/frontend/domain/type'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'
import { fieldServiceContext } from '../../services'

@model('@codelab/TestRootStore')
export class TestRootStore extends Model({
  fieldService: prop<IFieldService>(),
  typeService: prop<ITypeDomainService>(),
}) {
  protected override onInit(): void {
    typeDomainServiceContext.set(this, this.typeService)
    fieldServiceContext.set(this, this.fieldService)

    registerRootStore(this)
  }
}
