import type {
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/domain'
import {
  fieldServiceContext,
  typeServiceContext,
} from '@codelab/frontend/domain/type'
import { Model, model, prop, registerRootStore } from 'mobx-keystone'

@model('@codelab/TestRootStore')
export class TestRootStore extends Model({
  fieldService: prop<IFieldService>(),
  typeService: prop<ITypeService>(),
}) {
  protected override onInit(): void {
    typeServiceContext.set(this, this.typeService)
    fieldServiceContext.set(this, this.fieldService)

    registerRootStore(this)
  }
}
