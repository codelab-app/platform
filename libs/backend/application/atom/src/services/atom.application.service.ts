import { SortDirection } from '@codelab/backend/abstract/codegen'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AtomApplicationService {
  constructor(private atomRepository: AtomRepository) {}

  async fetchAllAtoms() {
    /**
     * Get all atoms first
     */
    const atoms = await this.atomRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
    })

    return atoms
  }
}
