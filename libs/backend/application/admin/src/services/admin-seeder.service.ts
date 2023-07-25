import {
  ExtractAntDesignFieldsService,
  ExtractHtmlFieldsService,
} from '@codelab/backend/application/type'
import { UserService } from '@codelab/backend/application/user'
import { antdTagTree, htmlTagTree } from '@codelab/backend/data/seed'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { antdAtomData, htmlAtomData } from '@codelab/shared/data/seed'
import { Injectable } from '@nestjs/common'
import { SeedFrameworkService } from '../use-case'

@Injectable()
export class AdminSeederService {
  constructor(
    private readonly userService: UserService,
    private readonly extractAntDesignFieldService: ExtractAntDesignFieldsService,
    private readonly seedFrameworkService: SeedFrameworkService,
  ) {}

  async seedAntDesign() {
    const fields = async (atoms: Array<IAtomDTO>) =>
      this.extractAntDesignFieldService.execute(atoms)

    await this.seedFrameworkService.execute({
      atoms: antdAtomData,
      fields,
      tags: antdTagTree,
    })
  }

  async seedHtml() {
    const fields = async (atoms: Array<IAtomDTO>) =>
      new ExtractHtmlFieldsService().execute(atoms)

    await this.seedFrameworkService.execute({
      atoms: htmlAtomData,
      fields,
      tags: htmlTagTree,
    })
  }
}
