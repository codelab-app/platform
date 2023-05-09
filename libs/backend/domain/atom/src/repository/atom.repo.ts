import type { Atom, AtomWhere } from '@codelab/backend/abstract/codegen'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
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
  Atom,
  AtomWhere
> {
  private Atom = Repository.instance.Atom

  async _find(where: AtomWhere = {}) {
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
          ({
            api,
            owner,
            requiredParents = [],
            suggestedChildren = [],
            tags,
            ...atom
          }) => ({
            ...atom,
            api: connectNodeId(api.id),
            owner: connectAuth0Owner(owner),
            requiredParents: connectNodeIds(
              requiredParents.map((parent) => parent.id),
            ),
            suggestedChildren: connectNodeIds(
              suggestedChildren.map((child) => child.id),
            ),
            tags: connectNodeIds(tags?.map((tag) => tag.id)),
          }),
        ),
      })
    ).atoms
  }

  protected async _update(
    {
      api,
      id,
      owner,
      requiredParents = [],
      suggestedChildren = [],
      tags,
      ...atom
    }: IAtomDTO,
    where: AtomWhere,
  ) {
    return (
      await (
        await this.Atom
      ).update({
        update: {
          ...atom,
          api: reconnectNodeId(api.id),
          requiredParents: whereNodeIds(
            requiredParents.map((parent) => parent.id),
          ),
          suggestedChildren: whereNodeIds(
            suggestedChildren.map((child) => child.id),
          ),
          tags: reconnectNodeIds(tags?.map((tag) => tag.id)),
        },
        where,
      })
    ).atoms[0]
  }
}
