import type { IAtom } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
  reconnectNodeIds,
  whereNodeIds,
} from '@codelab/shared/domain/mapper'

export class AtomRepository extends AbstractRepository<IAtom> {
  private Atom = Repository.instance.Atom

  async all() {
    return await (
      await this.Atom
    ).find({
      selectionSet: atomSelectionSet,
    })
  }

  async find(where: BaseTypeUniqueWhere = {}) {
    return (
      await (
        await this.Atom
      ).find({
        selectionSet: atomSelectionSet,
        where,
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
        input: atoms.map(
          ({ tags, api, allowedChildren = [], owner, ...atom }) => ({
            ...atom,
            allowedChildren: connectNodeIds(
              allowedChildren.map((child) => child.id),
            ),
            api: connectNodeId(api.id),
            owner: connectAuth0Owner(owner),
            tags: connectNodeIds(tags.map((tag) => tag.id)),
          }),
        ),
      })
    ).atoms
  }

  protected async _update(
    { tags, api, allowedChildren = [], owner, ...atom }: IAtom,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.Atom
      ).update({
        update: {
          ...atom,
          allowedChildren: whereNodeIds(
            allowedChildren.map((child) => child.id),
          ),
          api: reconnectNodeId(api.id),
          tags: reconnectNodeIds(tags.map((tag) => tag.id)),
        },
        where,
      })
    ).atoms[0]
  }
}
