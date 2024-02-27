import {
  ExtractAntDesignFieldsCommand,
  ExtractHtmlFieldsCommand,
} from '@codelab/backend/application/type'
import { antdTagTree, htmlTagTree } from '@codelab/backend/data/seed'
import type { IAtomDto } from '@codelab/shared/abstract/core'
import { antdAtomData, htmlAtomData } from '@codelab/shared/data/seed'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { SeedFrameworkCommand } from '../use-case'

@Injectable()
export class AdminSeederService {
  constructor(private commandBus: CommandBus) {}

  async seedAntDesign() {
    const fields = async (atoms: Array<IAtomDto>) =>
      this.commandBus.execute(new ExtractAntDesignFieldsCommand(atoms))

    await this.commandBus.execute(
      new SeedFrameworkCommand({
        atoms: antdAtomData,
        fields,
        tags: antdTagTree,
      }),
    )
  }

  async seedHtml() {
    const fields = async (atoms: Array<IAtomDto>) =>
      this.commandBus.execute(new ExtractHtmlFieldsCommand(atoms))

    await this.commandBus.execute(
      new SeedFrameworkCommand({
        atoms: htmlAtomData,
        fields,
        tags: htmlTagTree,
      }),
    )
  }
}
