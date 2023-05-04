import { IAuthService } from '@codelab/backend/abstract/types'
import {
  ExtractAntDesignFieldsService,
  ExtractHtmlFieldsService,
} from '@codelab/backend/application/type'
import { antdTagTree, htmlTagTree } from '@codelab/backend/data/seed'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { antdAtomData, htmlAtomData } from '@codelab/shared/data/seed'
import { SeedFrameworkService } from '../use-case'

export class AdminSeederService extends IAuthService {
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
    const fields = async (atoms: Array<IAtomDTO>) =>
      new ExtractHtmlFieldsService(this.owner).execute(atoms)

    await new SeedFrameworkService(this.owner).execute({
      atoms: htmlAtomData,
      fields,
      tags: htmlTagTree,
    })
  }
}
