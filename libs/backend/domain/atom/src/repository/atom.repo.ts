import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeId,
  reconnectNodeIds,
  whereNodeIds,
} from '@codelab/shared/domain/mapper'

export class AtomRepository extends AbstractRepository<
  IAtomDTO,
  OGM_TYPES.Atom,
  OGM_TYPES.AtomWhere
> {
  private Atom = Repository.instance.Atom

  async find(where: OGM_TYPES.AtomWhere = {}) {
    return await (
      await this.Atom
    ).find({
      selectionSet: atomSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(atoms: Array<IAtomDTO>) {
    return (
      await (
        await this.Atom
      ).create({
        input: atoms.map(
          ({ allowedChildren = [], api, owner, tags, ...atom }) => ({
            ...atom,
            allowedChildren: connectNodeIds(
              allowedChildren.map((child) => child.id),
            ),
            api: connectNodeId(api.id),
            owner: connectAuth0Owner(owner),
            tags: connectNodeIds(tags?.map((tag) => tag.id)),
          }),
        ),
      })
    ).atoms
  }

  protected async _update(
    { allowedChildren = [], api, owner, tags, ...atom }: IAtomDTO,
    where: OGM_TYPES.AtomWhere,
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
          tags: reconnectNodeIds(tags?.map((tag) => tag.id)),
        },
        where,
      })
    ).atoms[0]
  }
}
