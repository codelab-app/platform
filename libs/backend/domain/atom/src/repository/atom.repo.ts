import type { IAtom } from '@codelab/backend/abstract/core'
import { IRepository } from '@codelab/backend/abstract/types'
import {
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import {
  connectNode,
  connectNodes,
  whereNodeId,
  whereNodeIds,
} from '@codelab/shared/domain/mapper'
import { checkIfValidUUID } from '@codelab/shared/utils'

export class AtomRepository extends IRepository<IAtom> {
  private Atom = Repository.instance.Atom

  async find(where: BaseUniqueWhere) {
    return (
      await (
        await this.Atom
      ).find({
        where,
        selectionSet: atomSelectionSet,
      })
    )[0]
  }

  async save(data: IAtom, where?: BaseUniqueWhere) {
    if (await this.exists(data, where)) {
      return this.update(data, this.getWhere(data, where))
    }

    return (await this.add([data]))[0]
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
          tags: connectNodes(tags.map((tag) => tag.id)),
          api: connectNode(api.id),
          allowedChildren: connectNodes(
            allowedChildren.map((child) => child.id),
          ),
        })),
      })
    ).atoms
  }

  protected async _update(
    { tags, api, allowedChildren = [], ...atom }: IAtom,
    where: BaseUniqueWhere,
  ) {
    return (
      await (
        await this.Atom
      ).update({
        update: atom,
        where,
        connect: {
          tags: whereNodeIds(tags.map((tag) => tag.id)),
          api: whereNodeId(api.id),
          allowedChildren: whereNodeIds(
            allowedChildren.map((child) => child.id),
          ),
        },
      })
    ).atoms[0]
  }
}
