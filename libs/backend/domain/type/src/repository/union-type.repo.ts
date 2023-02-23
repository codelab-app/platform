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
        where,
        selectionSet: exportUnionTypeSelectionSet,
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
            owner: connectAuth0Owner(owner.auth0Id),
            typesOfUnionType: {
              PrimitiveType: connectNodeIds([]),
              ArrayType: connectNodeIds([]),
              InterfaceType: connectNodeIds([]),
              RenderPropsType: connectNodeIds([]),
              ReactNodeType: connectNodeIds([]),
              EnumType: connectNodeIds([]),
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
            PrimitiveType: [connectNodeIds([])],
            ArrayType: [connectNodeIds([])],
            InterfaceType: [connectNodeIds([])],
            RenderPropsType: [connectNodeIds([])],
            ReactNodeType: [connectNodeIds([])],
            EnumType: [connectNodeIds([])],
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
