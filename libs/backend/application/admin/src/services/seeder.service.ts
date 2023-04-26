import { IAuthService } from '@codelab/backend/abstract/types'
import { antdAtomData } from '@codelab/backend/application/atom'
import { ExtractAntDesignFieldsService } from '@codelab/backend/application/type'
import { antdTagTree } from '@codelab/backend/infra/data/seed'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { SeedFrameworkService } from '../use-case'

export class SeederService extends IAuthService {
  async seedAntDesign() {
    const fields = async (atoms: Array<IAtomDTO>) =>
      new ExtractAntDesignFieldsService(this.owner).execute(atoms)

    await new SeedFrameworkService(this.owner).execute({
      atoms: antdAtomData,
      fields,
      tags: antdTagTree,
    })
  }
}
