import type {
  Atom,
  AtomOptions,
  AtomWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
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
  connectOwner,
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
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
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
            externalCssSource,
            externalJsSource,
            externalSourceType,
            icon,
            id,
            name,
            requiredParents = [],
            suggestedChildren = [],
            tags,
            type,
          }) => ({
            api: connectNodeId(api.id),
            externalCssSource,
            externalJsSource,
            externalSourceType,
            icon,
            id,
            name,
            owner: connectOwner(this.authService.currentUser),
            requiredParents: connectNodeIds(
              requiredParents.map((parent) => parent.id),
            ),
            suggestedChildren: connectNodeIds(
              suggestedChildren.map((child) => child.id),
            ),
            tags: connectNodeIds(tags?.map((tag) => tag.id)),
            type,
          }),
        ),
      })
    ).atoms
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
      selectionSet: `{ ${atomSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { api, requiredParents = [], suggestedChildren = [], tags }: IAtomDTO,
    where: AtomWhere,
  ) {
    // console.log(where)
    // cLog({
    //   api: reconnectNodeId(api.id),
    //   requiredParents: whereNodeIds(requiredParents.map((parent) => parent.id)),
    //   suggestedChildren: whereNodeIds(
    //     suggestedChildren.map((child) => child.id),
    //   ),
    //   tags: reconnectNodeIds(tags?.map((tag) => tag.id)),
    // })

    return (
      await (
        await this.ogmService.Atom
      ).update({
        update: {
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
