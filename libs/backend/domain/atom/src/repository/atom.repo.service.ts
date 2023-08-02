import type {
  Atom,
  AtomModel,
  AtomOptions,
  AtomWhere,
} from '@codelab/backend/abstract/codegen'
import {
  atomSelectionSet,
  OGMService,
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
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtomRepository extends AbstractRepository<
  IAtomDTO,
  Atom,
  AtomWhere,
  AtomOptions
> {
  constructor(private ogmService: OGMService) {
    super()
  }

  async _find({
    options,
    where,
  }: {
    where?: AtomWhere
    options?: AtomOptions
  }) {
    return await (
      await this.ogmService.Atom
    ).find({
      options,
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
        await this.ogmService.Atom
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
            api: connectNodeId(api?.id),
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
        await this.ogmService.Atom
      ).update({
        update: {
          ...atom,
          api: reconnectNodeId(api?.id),
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
