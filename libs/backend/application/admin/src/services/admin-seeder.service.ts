import {
  ExtractAntDesignFieldsService,
  ExtractHtmlFieldsService,
} from '@codelab/backend/application/type'
import { antdTagTree, htmlTagTree } from '@codelab/backend/data/seed'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { antdAtomData, htmlAtomData } from '@codelab/shared/data/seed'
import { Injectable } from '@nestjs/common'
import { SeedFrameworkService } from '../use-case'

@Injectable()
export class AdminSeederService {
  constructor(
    private readonly extractAntDesignFieldService: ExtractAntDesignFieldsService,
    private readonly extractHtmlFieldsService: ExtractHtmlFieldsService,
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
      this.extractHtmlFieldsService.execute(atoms)

    await this.seedFrameworkService.execute({
      atoms: htmlAtomData,
      fields,
      tags: htmlTagTree,
    })
  }
}
