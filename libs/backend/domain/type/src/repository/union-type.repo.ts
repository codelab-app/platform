import type { IUnionType } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportUnionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectAuth0Owner,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'

export class UnionTypeRepository extends AbstractRepository<IUnionType> {
  private UnionType = Repository.instance.UnionType

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.UnionType
      ).find({
        selectionSet: exportUnionTypeSelectionSet,
        where,
      })
    )[0]
  }

  // async save(unionType: IUnionType, where?: BaseTypeUniqueWhere) {
  //   if (await this.exists(unionType, where)) {
  //     return this.update(unionType, this.getWhere(unionType, where))
  //   }

  //   return (await this.add([unionType]))[0]
  // }

  protected async _add(unionTypes: Array<IUnionType>) {
    return (
      await (
        await this.UnionType
      ).create({
        input: unionTypes.map(
          ({ __typename, owner, typesOfUnionType, ...type }) => ({
            ...type,
            owner: connectAuth0Owner(owner),
            typesOfUnionType: {
              ArrayType: connectNodeIds([]),
              EnumType: connectNodeIds([]),
              InterfaceType: connectNodeIds([]),
              PrimitiveType: connectNodeIds([]),
              ReactNodeType: connectNodeIds([]),
              RenderPropsType: connectNodeIds([]),
            },
          }),
        ),
      })
    ).unionTypes
  }

  protected async _update(
    { __typename, owner, typesOfUnionType, ...unionType }: IUnionType,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.UnionType
      ).update({
        update: {
          ...unionType,
          typesOfUnionType: {
            ArrayType: [connectNodeIds([])],
            EnumType: [connectNodeIds([])],
            InterfaceType: [connectNodeIds([])],
            PrimitiveType: [connectNodeIds([])],
            ReactNodeType: [connectNodeIds([])],
            RenderPropsType: [connectNodeIds([])],
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
