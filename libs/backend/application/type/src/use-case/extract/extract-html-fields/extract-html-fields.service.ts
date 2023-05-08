import type { HtmlField } from '@codelab/backend/abstract/core'
import { IAuthUseCase } from '@codelab/backend/abstract/types'
import {
  Field,
  FieldRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAtomDTO, IFieldDTO } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { readFileSync } from 'fs'
import path from 'path'
import { v4 } from 'uuid'
import { HtmlTypeAdapterService } from '../../type-adapter/html-type-adapter/html-type-adapter.service'

export type HtmlData = Record<string, Array<HtmlField>>

export class ExtractHtmlFieldsService extends IAuthUseCase<
  Array<IAtomDTO>,
  Array<IFieldDTO>
> {
  private htmlDataFolder = `${process.cwd()}/data/html/`

  fieldRepository = new FieldRepository()

  async _execute(atoms: Array<IAtomDTO>) {
    const htmlAttributesByName = JSON.parse(
      readFileSync(path.resolve(this.htmlDataFolder, 'html.json'), 'utf8'),
    ) as HtmlData

    return atoms.reduce(async (accFieldsPromise, atom) => {
      // Convert HtmlA to a
      const htmlName = atom.name.toLowerCase().replace('html', '')
      const htmlFields = htmlAttributesByName[htmlName]

      if (!htmlFields) {
        console.log(htmlName)

        process.exit(0)

        return await accFieldsPromise
      }

      const fields = await this.transformFields(atom, htmlFields)

      return [...(await accFieldsPromise), ...fields]
    }, Promise.resolve([] as Array<IFieldDTO>))
  }

  private async transformFields(atom: IAtomDTO, fields: Array<HtmlField>) {
    return fields.reduce<Promise<Array<IFieldDTO>>>(
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

  private async createOrUpdateField(
    atom: IAtomDTO,
    field: HtmlField,
  ): Promise<IFieldDTO | undefined> {
    const existingField = await this.fieldRepository.findOne({
      api: {
        id: atom.api.id,
      },
      key: field.key,
    })

    if (existingField) {
      return existingField
    }

    const fieldTypeDTO = await new HtmlTypeAdapterService({
      atom,
      field: {
        key: field.key,
      },
      owner: this.owner,
    }).execute({ type: field.type })

    if (!fieldTypeDTO) {
      return undefined
    }

    const type = await TypeFactory.save(
      {
        ...fieldTypeDTO,
        owner: this.owner,
      },
      { name: fieldTypeDTO.name },
    )

    return Field.create({
      api: { id: atom.api.id },
      defaultValues: null,
      description: '',
      fieldType: type,
      id: v4(),
      key: field.key,
      name: compoundCaseToTitleCase(field.key),
    })
  }
}
