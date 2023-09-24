import { SortDirection } from '@codelab/backend/abstract/codegen'
import type { IAtomOutputDto } from '@codelab/backend/abstract/core'
import { Atom, AtomRepository } from '@codelab/backend/domain/atom'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { IAtomType } from '@codelab/shared/abstract/core'
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

  async seedReactFragment() {
    const reactFragmentExists = await this.atomRepository.findOne({
      type: IAtomType.ReactFragment,
    })

    if (reactFragmentExists) {
      return
    }

    // Seed atom manually for now, in future we will import
    const newInterfaceType = InterfaceType.createFromAtomName(
      IAtomType.ReactFragment,
    )

    const interfaceType =
      await this.interfaceTypeRepository.save(newInterfaceType)

    const atom = Atom.create({
      api: interfaceType,
      id: v4(),
      name: IAtomType.ReactFragment,
      type: IAtomType.ReactFragment,
    })

    await this.atomRepository.save(atom)
  }
}
