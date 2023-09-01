import type { Element, ElementWhere } from '@codelab/backend/abstract/codegen'
import {
  elementSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { getClosestContainerNodeId } from './get-closest-container-node-id'

export class ElementRepository extends AbstractRepository<
  IElementDTO,
  Element,
  ElementWhere
> {
  private Element = Repository.instance.Element

  async _find(where: ElementWhere = {}) {
    return await (
      await this.Element
    ).find({
      selectionSet: elementSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(elements: Array<IElementDTO>) {
    const input = await Promise.all(
      elements.map(async ({ id, name, props }) => ({
        _compoundName: createUniqueName(
          name,
          await getClosestContainerNodeId(id),
        ),
        id,
        props: connectNodeId(props.id),
      })),
    )

    return (await (await this.Element).create({ input })).elements
  }

  protected async _update(
    { id, name, props }: IElementDTO,
    where: ElementWhere,
  ) {
    const closestContainerNodeId = await getClosestContainerNodeId(id)

    return (
      await (
        await this.Element
      ).update({
        update: {
          _compoundName: createUniqueName(name, closestContainerNodeId),
          id,
          props: reconnectNodeId(props.id),
        },
        where,
      })
    ).elements[0]
  }
}
