import type {
  ITypeDomainService,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import {
  getFieldDomainService,
  ICreateTypeData,
} from '@codelab/frontend/abstract/domain'
import type { GetTypesQuery } from '@codelab/shared/abstract/codegen'
import { ITypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { InterfaceType, TypeFactory } from './models'

@model('@codelab/TypeDomainService')
export class TypeDomainService
  extends Model({
    /**
     * This holds all types
     */
    types: prop(() => objectMap<ITypeModel>()),
  })
  implements ITypeDomainService
{
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
  hydrate(typeDTO: ITypeDTO) {
    const existingType = this.types.get(typeDTO.id)

    if (existingType) {
      return existingType
    }

    const type = TypeFactory.create(typeDTO)

    this.types.set(type.id, type)

    return type
  }

  @modelAction
  hydrateInterface(data: ICreateTypeData) {
    const interfaceType = new InterfaceType({
      id: data.id,
      name: data.name,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }

  @modelAction
  hydrateTypes(types: Partial<GetTypesQuery>) {
    console.debug('TypeService.loadTypes()', types)

    const flatTypes = Object.values(types).flat()

    const fields =
      types.interfaceTypes?.flatMap((fragment) => fragment.fields) ?? []

    fields.forEach((field) => this.fieldDomainService.hydrate(field))

    const loadedTypes = flatTypes.map((fragment) =>
      TypeFactory.create(fragment),
    )

    for (const type of loadedTypes) {
      this.types.set(type.id, type)
    }

    return loadedTypes
  }

  @computed
  private get fieldDomainService() {
    return getFieldDomainService(this)
  }
}
