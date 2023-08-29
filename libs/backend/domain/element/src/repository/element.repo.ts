import type { Element, ElementWhere } from '@codelab/backend/abstract/codegen'
import {
  elementSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'

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
    return (
      await (
        await this.Element
      ).create({
        input: elements.map(({ closestContainerNode, id, name, props }) => ({
          _compoundName: createUniqueName(name, closestContainerNode.id),
          id,
          props: connectNodeId(props.id),
        })),
      })
    ).elements
  }

  protected async _update(
    { closestContainerNode, id, name, props }: IElementDTO,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.Element
      ).update({
        update: {
          _compoundName: createUniqueName(name, closestContainerNode.id),
          id,
          props: reconnectNodeId(props.id),
        },
        where,
      })
    ).elements[0]
  }
}
