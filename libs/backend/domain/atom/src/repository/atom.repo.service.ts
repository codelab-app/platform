import type {
  Atom,
  AtomOptions,
  AtomWhere,
} from '@codelab/backend/abstract/codegen'
import type { IAtomDto } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  atomSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { atomMapper } from '@codelab/shared-domain-module-atom'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtomRepository extends AbstractRepository<
  IAtomDto,
  Atom,
  AtomWhere,
  AtomOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(atoms: Array<IAtomDto>) {
    return (
      await (
        await this.ogmService.Atom
      ).create({
        input: atoms.map((atom) => atomMapper.toCreateInput(atom)),
      })
    ).atoms
  }

  protected async _find({
    options,
    selectionSet = `{ ${atomSelectionSet} }`,
    where,
  }: {
    where?: AtomWhere
    options?: AtomOptions
    selectionSet?: string
  }) {
    return await (
      await this.ogmService.Atom
    ).find({ options, selectionSet, where })
  }

  protected async _update(atom: IAtomDto, where: AtomWhere) {
    return (
      await (
        await this.ogmService.Atom
      ).update({
        update: atomMapper.toUpdateInput(atom),
        where,
      })
    ).atoms[0]
  }
}
