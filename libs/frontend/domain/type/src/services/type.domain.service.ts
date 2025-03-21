import type {
  ITypeDomainService,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { IInterfaceTypeDto, ITypeDto } from '@codelab/shared/abstract/core'

import { getFieldDomainService } from '@codelab/frontend/abstract/domain'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { type TypeFragment, TypeKind } from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { isDefined } from 'remeda'

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
  hydrateInterface(data: IInterfaceTypeDto) {
    let interfaceType = this.types.get(data.id) as InterfaceType | undefined

    if (interfaceType) {
      return interfaceType
    }

    interfaceType = InterfaceType.create({
      __typename: ITypeKind.InterfaceType,
      fields: data.fields,
      id: data.id,
      kind: ITypeKind.InterfaceType,
      name: data.name,
      owner: data.owner,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }

  @modelAction
  hydrateTypes(types: Array<TypeFragment>) {
    // console.debug('TypeService.loadTypes()', types)

    types
      .map((fragment) => TypeFactory.create(fragment))
      .forEach((type) => this.types.set(type.id, type))

    /**
     * Fields must be hydrated after the interface type
     */
    types
      .filter((fragment) => fragment.__typename === TypeKind.InterfaceType)
      .flatMap((fragment) => fragment.fields)
      .forEach((field) => this.fieldDomainService.hydrate(field))

    return types.map((type) => this.types.get(type.id)).filter(isDefined)
  }

  @modelAction
  primitiveKind(id: string) {
    const type = this.types.get(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  type<T extends ITypeModel>(id: string) {
    const type = this.types.get(id)

    Validator.assertsDefined(type)

    return type as T
  }

  typeByKind<T extends ITypeKind>(kind: T) {
    const foundType = Array.from(this.types.values()).find(
      (type) => type.kind === kind,
    )

    Validator.assertsDefined(foundType)

    return foundType
  }

  @computed
  private get fieldDomainService() {
    return getFieldDomainService(this)
  }
}
