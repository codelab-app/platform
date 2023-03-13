import type { IUnionType } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  exportUnionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IUnionTypeDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'

export class UnionTypeRepository extends AbstractRepository<
  IUnionTypeDTO,
  OGM_TYPES.UnionType,
  OGM_TYPES.UnionTypeWhere
> {
  private UnionType = Repository.instance.UnionType

  async find(where: OGM_TYPES.UnionTypeWhere) {
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
    { __typename, owner, typesOfUnionType, ...unionType }: IUnionTypeDTO,
    where: OGM_TYPES.UnionTypeWhere,
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
