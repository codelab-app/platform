import type {
  Atom,
  AtomOptions,
  AtomWhere,
} from '@codelab/backend/abstract/codegen'
import {
  atomSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import {
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
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
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
            requiredParents = [],
            suggestedChildren = [],
            tags,
            ...atom
          }) => ({
            ...atom,
            api: connectNodeId(api.id),
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
