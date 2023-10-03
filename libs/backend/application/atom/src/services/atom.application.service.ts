import { SortDirection } from '@codelab/backend/abstract/codegen'
import type { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportAtomCommand } from '../use-case'

@Injectable()
export class AtomApplicationService {
  constructor(
    private atomRepository: AtomRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Span()
  async exportAtomsForAdmin(): Promise<Array<IAtomOutputDto>> {
    /**
     * Get all atoms first
     */
    const atoms = await this.atomRepository.find({
      options: {
        limit: 1,
        sort: [{ name: SortDirection.Asc }],
      },
    })

    return await Promise.all(
      atoms.map(
        async (atom) =>
          await this.commandBus.execute<ExportAtomCommand, IAtomOutputDto>(
            new ExportAtomCommand({ id: atom.id }),
          ),
      ),
    )
  }
}
