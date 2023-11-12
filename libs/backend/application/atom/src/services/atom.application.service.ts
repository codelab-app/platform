import { SortDirection } from '@codelab/backend/abstract/codegen'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IAtomBoundedContext } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAtomCommand } from '../use-case'

@Injectable()
export class AtomApplicationService {
  constructor(
    private atomRepository: AtomRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Span()
  async exportAtomsForAdmin(): Promise<Array<IAtomBoundedContext>> {
    /**
     * Get all atoms first
     */
    const atomIds = await this.atomRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      selectionSet: `{ id }`,
    })

    const exportedAtoms = []

    for (const { id } of atomIds) {
      exportedAtoms.push(
        await this.commandBus.execute(new ExportAtomCommand({ id })),
      )
    }

    return exportedAtoms
  }
}
