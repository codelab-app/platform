import type { Element, ElementWhere } from '@codelab/backend/abstract/codegen'
import {
  elementSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'

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
        input: elements.map(({ id, name, props }) => ({
          id,
          name,
          props: connectNodeId(props.id),
        })),
      })
    ).elements
  }

  protected async _update(
    { id, name, props }: IElementDTO,
    where: ElementWhere,
  ) {
    return (
      await (
        await this.Element
      ).update({
        update: {
          id,
          name,
          props: reconnectNodeId(props.id),
        },
        where,
      })
    ).elements[0]
  }
}
