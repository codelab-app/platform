import type { IAtomDto, INodeType } from '@codelab/shared/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { AtomFragment } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/typebox'
import { atomApi, atomMapper } from '@codelab/shared-domain-module-atom'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtomRepository extends AbstractRepository<
  INodeType.Atom,
  IAtomDto,
  AtomFragment,
  AtomWhere,
  AtomOptions
> {
  constructor(

    protected override loggerService: PinoLoggerService,
  ) {
    super(loggerService)
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
