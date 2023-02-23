import type { IAtom } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
  reconnectNodeIds,
  whereNodeIds,
} from '@codelab/shared/domain/mapper'

export class AtomRepository extends AbstractRepository<IAtom> {
  private Atom = Repository.instance.Atom

  async find(where: BaseTypeUniqueWhere) {
    return (
      await (
        await this.Atom
      ).find({
        where,
        selectionSet: atomSelectionSet,
      })
    )[0]
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(atoms: Array<IAtom>) {
    return (
      await (
        await this.Atom
      ).create({
        input: atoms.map(({ tags, api, allowedChildren = [], ...atom }) => ({
          ...atom,
          tags: connectNodeIds(tags.map((tag) => tag.id)),
          api: connectNodeId(api.id),
          allowedChildren: connectNodeIds(
            allowedChildren.map((child) => child.id),
          ),
        })),
      })
    ).atoms
  }

  protected async _update(
    { tags, api, allowedChildren = [], ...atom }: IAtom,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.Atom
      ).update({
        update: {
          ...atom,
          tags: reconnectNodeIds(tags.map((tag) => tag.id)),
          api: reconnectNodeId(api.id),
          allowedChildren: whereNodeIds(
            allowedChildren.map((child) => child.id),
          ),
        },
        where,
      })
    ).atoms[0]
  }
}
