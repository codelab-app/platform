import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { ICreateTypeData } from '@codelab/frontend/abstract/domain'
import { ITypeDTO } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { InterfaceType, TypeFactory } from './models'

@model('@codelab/TypeDomainService')
export class TypeDomainService extends Model({
  /**
   * This holds all types
   */
  types: prop(() => objectMap<ITypeModel>()),
}) {
  @computed
  get typesList() {
    // loading sub types messes up the order of the next page
    // we need to sort here to make sure the types on the
    // table are always sorted alphabetically
    return Array.from(this.types.values()).sort((typeA, typeB) =>
      typeA.name.toLowerCase() < typeB.name.toLowerCase() ? -1 : 1,
    )
  }

  @modelAction
  add(typeDTO: ITypeDTO) {
    const existingType = this.types.get(typeDTO.id)

    if (existingType) {
      return existingType
    }

    const type = TypeFactory.create(typeDTO)

    this.types.set(type.id, type)

    return type
  }

  @modelAction
  addInterface(data: ICreateTypeData) {
    const interfaceType = new InterfaceType({
      id: data.id,
      name: data.name,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }
}
