import type {
  UnionType,
  UnionTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportUnionTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUnionTypeDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'

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
    where: UnionTypeWhere,
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
