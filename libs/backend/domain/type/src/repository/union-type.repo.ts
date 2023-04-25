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
          ({ __typename, owner, typesOfUnionType, ...type }) => {
            const connectIds = typesOfUnionType.map(({ id }) => id)

            return {
              ...type,
              owner: connectAuth0Owner(owner),
              typesOfUnionType: {
                ArrayType: connectNodeIds(connectIds),
                EnumType: connectNodeIds(connectIds),
                InterfaceType: connectNodeIds(connectIds),
                PrimitiveType: connectNodeIds(connectIds),
                ReactNodeType: connectNodeIds(connectIds),
                RenderPropType: connectNodeIds(connectIds),
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
    where: OGM_TYPES.UnionTypeWhere,
  ) {
    const connectIds = typesOfUnionType.map(({ id: typeId }) => typeId)

    return (
      await (
        await this.UnionType
      ).update({
        selectionSet: `{ unionTypes ${exportUnionTypeSelectionSet} }`,
        update: {
          id,
          name,
          typesOfUnionType: {
            ArrayType: [connectNodeIds(connectIds)],
            EnumType: [connectNodeIds(connectIds)],
            InterfaceType: [connectNodeIds(connectIds)],
            PrimitiveType: [connectNodeIds(connectIds)],
            ReactNodeType: [connectNodeIds(connectIds)],
            RenderPropType: [connectNodeIds(connectIds)],
          },
        },
        where,
      })
    ).unionTypes[0]
  }
}
