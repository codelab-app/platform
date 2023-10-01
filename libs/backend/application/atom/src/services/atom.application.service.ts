import { SortDirection } from '@codelab/backend/abstract/codegen'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import type { IAtomBoundedContext } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { v4 } from 'uuid'
import { ExportAtomCommand } from '../use-case'

@Injectable()
export class AtomApplicationService {
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Span()
  async exportAtomsForAdmin(): Promise<Array<IAtomBoundedContext>> {
    /**
     * Get all atoms first
     */
    const atoms = await this.atomRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
    })

    return await Promise.all(
      atoms.map(
        async (atom) =>
          await this.commandBus.execute<ExportAtomCommand, IAtomBoundedContext>(
            new ExportAtomCommand({ id: atom.id }),
          ),
      ),
    )
  }
}
