import type {
  ITypeDomainService,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import { getFieldDomainService } from '@codelab/frontend/abstract/domain'
import type { GetTypesQuery } from '@codelab/shared/infra/gql'
import {
  ICreateTypeDto,
  ITypeDto,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { InterfaceType, TypeFactory } from '../store'

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
  hydrate(typeDto: ITypeDto) {
    const existingType = this.types.get(typeDto.id)

    if (existingType) {
      return existingType
    }

    const type = TypeFactory.create(typeDto)

    this.types.set(type.id, type)

    return type
  }

  @modelAction
  hydrateInterface(data: ICreateTypeDto) {
    let interfaceType = this.types.get(data.id) as InterfaceType | undefined

    if (interfaceType) {
      return interfaceType
    }

    interfaceType = new InterfaceType({
      id: data.id,
      name: data.name,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }

  @modelAction
  hydrateTypes(types: Partial<GetTypesQuery>) {
    // console.debug('TypeService.loadTypes()', types)

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

  @modelAction
  primitiveKind(id: string) {
    const type = this.types.get(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  getType(id: string) {
    return this.types.get(id)
  }

  @computed
  private get fieldDomainService() {
    return getFieldDomainService(this)
  }
}
