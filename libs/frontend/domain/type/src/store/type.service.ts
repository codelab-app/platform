import type {
  IAnyType,
  ICreateTypeDTO,
  IInterfaceTypeRef,
  ITypeDTO,
  ITypeService,
  IUpdateTypeDTO,
} from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService } from '@codelab/frontend/shared/utils'
import { BaseTypeWhere } from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { createTypeFactory, updateTypeInputFactory } from '../use-cases/types'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from './apis/type.api'
import { typeFactory } from './type.factory'
import { TypeModalService } from './type-modal.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    id: idProp,
    types: prop(() => objectMap<IAnyType>()),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TypeModalService({})),
    deleteModal: prop(() => new TypeModalService({})),

    selectedIds: prop(() => arraySet<string>()).withSetter(),
  })
  implements ITypeService
{
  @computed
  get data() {
    return [...this.types.values()].map((t) => ({
      id: t.id,
      name: t.name,
      typeKind: t.kind,
    }))
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  get typesList() {
    return [...this.types.values()]
  }

  @modelAction
  type(id: string) {
    return this.types.get(id)
  }

  @modelAction
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind> {
    const type = this.type(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  /**
   * Caches all types into mobx
   */
  @modelAction
  load = (types: GetTypesQuery) => {
    console.debug('TypeService.cacheAll', types)

    const flatTypes = Object.values(types).flat()

    return flatTypes.map((type) => this.writeCache(type))
  }

  @modelAction
  addTypeLocal(type: IAnyType) {
    this.types.set(type.id, type)
  }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    console.log('TypeService.writeCache')

    let typeModel = this.types.get(fragment.id)

    if (typeModel) {
      typeModel.writeCache(fragment)
    } else {
      typeModel = typeFactory(fragment)
      this.types.set(fragment.id, typeModel)

      // Write cache writes to the fields
      if (
        typeModel.kind === ITypeKind.InterfaceType &&
        fragment.__typename === 'InterfaceType'
      ) {
        typeModel.writeFieldCache(fragment.fields)
      }
    }

    return typeModel
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: TypeService,
    entity: IAnyType,
    data: IUpdateTypeDTO,
  ) {
    const args = {
      where: { id: entity.id },
      ...updateTypeInputFactory(data),
    }

    const updatedTypes = yield* _await(updateTypeApi[entity.kind](args))

    return updatedTypes.map((type) => this.writeCache(type))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, where?: BaseTypeWhere) {
    const ids = where?.id_IN ?? undefined
    const types = yield* _await(getAllTypes(ids))

    return types.map((type) => {
      return this.writeCache(type)
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    if (this.types.has(id)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.types.get(id)!
    }

    const all = yield* _await(this.getAll({ id_IN: [id] }))

    return all[0]
  })

  @modelFlow
  @transaction
  getAllWithDescendants = _async(function* (
    this: TypeService,
    ids: Array<string> = [],
  ) {
    const { arrayTypes, unionTypes, interfaceTypes } = yield* _await(
      getTypeApi.GetDescendants({ ids }),
    )

    console.log(interfaceTypes)

    const allDescendantIds = [
      ...arrayTypes,
      ...unionTypes,
      ...interfaceTypes,
    ].reduce<Array<string>>(
      (descendantIds, { descendantTypesIds }) => [
        ...descendantIds,
        ...descendantTypesIds.flat(),
      ],
      [],
    )

    // remove duplicates
    const allIds = [...new Set([...ids, ...allDescendantIds])]

    return yield* _await(this.getAll({ id_IN: allIds }))
  })

  /**
   * A wrapper around getAllWithDescendants with some type checking
   */
  @modelFlow
  @transaction
  getInterfaceAndDescendants = _async(function* (
    this: TypeService,
    id: IInterfaceTypeRef,
  ) {
    const interfaceAndDescendants = yield* _await(
      this.getAllWithDescendants([id]),
    )

    const interfaceType = interfaceAndDescendants.find((x) => x.id === id)

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return interfaceType
  })

  /*
   * The array of types must be of same type
   *
   * Issue with interfaceType & fieldConnections variable getting repeated in Neo4j if we create multiple at a time.
   */
  @modelFlow
  @transaction
  create = _async(function* (this: TypeService, data: Array<ICreateTypeDTO>) {
    const input = createTypeFactory(data)

    const types: Array<ITypeDTO> = yield* _await(
      Promise.all(
        input.map((type) => {
          if (!type.kind) {
            throw new Error('Type requires a kind')
          }

          return createTypeApi[type.kind](input)
        }),
      ).then((res) => res.flat()),
    )

    return types.map((type) => this.writeCache(type))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, ids: Array<string>) {
    const types = ids
      .map((id) => this.types.get(id))
      .filter((type): type is IAnyType => Boolean(type))

    ids.forEach((id) => this.types.delete(id))

    const results = yield* _await(
      Promise.all(
        types.map((type) =>
          deleteTypeApi[type.kind]({ where: { id: type.id } }),
        ),
      ),
    )

    return results.reduce((total, { nodesDeleted }) => nodesDeleted + total, 0)
  })
}
