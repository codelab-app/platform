import type { HtmlField } from '@codelab/backend-abstract-core'
import type { ICommandHandler } from '@nestjs/cqrs'

import {
  Field,
  FieldRepository,
  TypeFactory,
} from '@codelab/backend-domain-type'
import { type IAtomDto, type IFieldDto } from '@codelab/shared-abstract-core'
import { titleCase } from '@codelab/shared-utils'
import { CommandHandler } from '@nestjs/cqrs'
import { readFileSync } from 'fs'
import path from 'path'
import { v4 } from 'uuid'

import { HtmlTypeAdapterService } from '../../type-adapter/html-type-adapter/html-type-adapter.service'

export type HtmlData = Record<string, Array<HtmlField>>

export class ExtractHtmlFieldsCommand {
  constructor(public atoms: Array<IAtomDto>) {}
}

@CommandHandler(ExtractHtmlFieldsCommand)
export class ExtractHtmlFieldsHandler
  implements ICommandHandler<ExtractHtmlFieldsCommand, Array<IFieldDto>>
{
  constructor(
    private typeFactory: TypeFactory,
    private htmlTypeAdapterService: HtmlTypeAdapterService,
    private readonly fieldRepository: FieldRepository,
  ) {}

  async execute({ atoms }: ExtractHtmlFieldsCommand) {
    const htmlAttributesByName = JSON.parse(
      readFileSync(path.resolve(this.htmlDataFolder, 'html.json'), 'utf8'),
    ) as HtmlData

    return atoms.reduce(async (accFieldsPromise, atom) => {
      // Convert HtmlA to a
      const htmlName = atom.name.toLowerCase().replace('html', '')
      const htmlFields = htmlAttributesByName[htmlName]

      if (!htmlFields) {
        process.exit(0)

        return await accFieldsPromise
      }

      const fields = await this.transformFields(atom, htmlFields)

      return [...(await accFieldsPromise), ...fields]
    }, Promise.resolve([] as Array<IFieldDto>))
  }

  private async createOrUpdateField(
    atom: IAtomDto,
    field: HtmlField,
  ): Promise<IFieldDto | undefined> {
    const existingField = await this.fieldRepository.findOne({
      where: {
        api: {
          id: atom.api.id,
        },
        key: field.key,
      },
    })

    if (existingField) {
      return existingField
    }

    const fieldTypeDto = await this.htmlTypeAdapterService.execute({
      atom,
      field,
      type: field.type,
    })

    if (!fieldTypeDto) {
      return undefined
    }

    const type = await this.typeFactory.save(fieldTypeDto, {
      name: fieldTypeDto.name,
    })

    return Field.create({
      api: { id: atom.api.id },
      defaultValues: null,
      description: '',
      fieldType: type,
      id: v4(),
      key: field.key,
      name: titleCase(field.key),
    })
  }

  private htmlDataFolder = `${process.cwd()}/data/html/`

  private async transformFields(atom: IAtomDto, fields: Array<HtmlField>) {
    return fields.reduce<Promise<Array<IFieldDto>>>(
      async (accFields, field) => {
        const existingOrNewField = await this.createOrUpdateField(atom, field)

        if (!existingOrNewField) {
          return [...(await accFields)]
        }

        return [...(await accFields), existingOrNewField]
      },
      Promise.resolve([]),
    )
  }
}
