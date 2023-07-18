import type {
  UnionType,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportUnionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IBaseTypeDTO, IUnionTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { cLog } from '@codelab/shared/utils'

const filterTypeIds = (
  typesOfUnionType: Array<Omit<IBaseTypeDTO, 'owner'>>,
  kind: ITypeKind,
): Array<string> =>
  typesOfUnionType.filter((_type) => _type.kind === kind).map(({ id }) => id)

const getFilteredTypes = (
  typesOfUnionType: Array<Omit<IBaseTypeDTO, 'owner'>>,
) => ({
  arrayTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ArrayType),
  enumTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.EnumType),
  interfaceTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.InterfaceType),
  primitiveTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.PrimitiveType),
  reactNodeTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.ReactNodeType),
  renderPropTypeIds: filterTypeIds(typesOfUnionType, ITypeKind.RenderPropType),
})

export class UnionTypeRepository extends AbstractRepository<
  IUnionTypeDTO,
  UnionType,
  UnionTypeWhere
> {
  private UnionType = Repository.instance.UnionType

  async _find(where: UnionTypeWhere) {
    return await (
      await this.UnionType
    ).find({
      selectionSet: exportUnionTypeSelectionSet,
      where,
    })
  }

  protected async _add(unionTypes: Array<IUnionTypeDTO>) {
    return (
      await (
        await this.UnionType
      ).create({
        input: unionTypes.map(
          ({ __typename, id, kind, name, owner, typesOfUnionType }) => {
            const {
              arrayTypeIds,
              enumTypeIds,
              interfaceTypeIds,
              primitiveTypeIds,
              reactNodeTypeIds,
              renderPropTypeIds,
            } = getFilteredTypes(typesOfUnionType)

            cLog({
              id,
              kind,
              name,
              owner: connectAuth0Owner(owner),
              typesOfUnionType: {
                ArrayType: connectNodeIds(arrayTypeIds),
                EnumType: connectNodeIds(enumTypeIds),
                InterfaceType: connectNodeIds(interfaceTypeIds),
                PrimitiveType: connectNodeIds(primitiveTypeIds),
                ReactNodeType: connectNodeIds(reactNodeTypeIds),
                RenderPropType: connectNodeIds(renderPropTypeIds),
              },
            })

            return {
              id,
              kind,
              name,
              owner: connectAuth0Owner(owner),
              typesOfUnionType: {
                ArrayType: connectNodeIds(arrayTypeIds),
                EnumType: connectNodeIds(enumTypeIds),
                InterfaceType: connectNodeIds(interfaceTypeIds),
                PrimitiveType: connectNodeIds(primitiveTypeIds),
                ReactNodeType: connectNodeIds(reactNodeTypeIds),
                RenderPropType: connectNodeIds(renderPropTypeIds),
              },
            }
          },
        ),
        selectionSet: `{ unionTypes ${exportUnionTypeSelectionSet} }`,
      })
    ).unionTypes
  }

  protected async _update(
    { id, name, typesOfUnionType }: IUnionTypeDTO,
    where: UnionTypeWhere,
  ) {
    const {
      arrayTypeIds,
      enumTypeIds,
      interfaceTypeIds,
      primitiveTypeIds,
      reactNodeTypeIds,
      renderPropTypeIds,
    } = getFilteredTypes(typesOfUnionType)

    return (
      await (
        await this.UnionType
      ).update({
        selectionSet: `{ unionTypes ${exportUnionTypeSelectionSet} }`,
        update: {
          id,
          name,
          typesOfUnionType: {
            ArrayType: reconnectNodeIds(arrayTypeIds),
            EnumType: reconnectNodeIds(enumTypeIds),
            InterfaceType: reconnectNodeIds(interfaceTypeIds),
            PrimitiveType: reconnectNodeIds(primitiveTypeIds),
            ReactNodeType: reconnectNodeIds(reactNodeTypeIds),
            RenderPropType: reconnectNodeIds(renderPropTypeIds),
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
