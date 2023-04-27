import { IAuthService } from '@codelab/backend/abstract/types'
import { ExtractAntDesignFieldsService } from '@codelab/backend/application/type'
import { antdTagTree } from '@codelab/backend/data/seed'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { antdAtomData } from '@codelab/shared/data/seed'
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

  async seedHtml() {
    // await new SeedFrameworkService(this.owner).execute({
    //   atoms: htmlAtomData,
    //   fields: () => [],
    //   tags: htmlTagTree,
    // })
  }
}
