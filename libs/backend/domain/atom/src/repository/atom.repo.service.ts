import type { IAtomDto } from '@codelab/shared/abstract/core'
import type { Atom, AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { AtomFragment } from '@codelab/shared/infra/gql'
import { atomApi, atomMapper } from '@codelab/shared-domain-module-atom'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtomRepository extends AbstractRepository<
  IAtomDto,
  AtomFragment,
  AtomWhere,
  AtomOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(atoms: Array<IAtomDto>) {
    const {
      createAtoms: { atoms: createdAtoms },
    } = await atomApi().CreateAtoms({
      input: atoms.map((atom) => atomMapper.toCreateInput(atom)),
    })

    return createdAtoms
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AtomWhere
    options?: AtomOptions
  }) {
    const { items } = await atomApi().AtomList({
      options,
      where,
    })

    return items
  }

  protected async _update(atom: IAtomDto, where: AtomWhere) {
    const {
      updateAtoms: { atoms },
    } = await atomApi().UpdateAtoms({
      update: atomMapper.toUpdateInput(atom),
      where,
    })

    return atoms[0]
  }
}
