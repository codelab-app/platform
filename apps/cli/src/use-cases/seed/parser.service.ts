import {
  AntDesignFieldsByFile,
  ExistingData,
  FieldDataKeyByApiId,
  IAtomImport,
} from '@codelab/backend/abstract/core'
import { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { atomTypeKeyByFileName } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { createAntdAtomData } from './data/ant-design-atom.data'
import { readCsvFiles } from './read-csv-files'
import { getTypeForApi } from './type-map'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class ParserService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private readonly atoms: { [atomName: string]: IAtomImport }

  constructor(private userId: string, private existingData: ExistingData) {
    // cLog('Existing Data', existingData)
    // logger.info('Existing Data', existingData)

    this.atoms = createAntdAtomData(existingData)
      .map((atom) => ({
        [atom.name]: atom,
      }))
      .reduce(merge, {})
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async extractFieldData(): Promise<FieldDataKeyByApiId> {
    const csvData = await readCsvFiles(this.antdDataFolder)

    return this.transform(csvData)
  }

  private async transform(
    fieldsByFile: AntDesignFieldsByFile,
  ): Promise<FieldDataKeyByApiId> {
    const fieldDataKeyByApiId: FieldDataKeyByApiId = {}

    for (const [file, antdDesignFields] of Object.entries(fieldsByFile)) {
      const atomName = atomTypeKeyByFileName[file.replace('.csv', '')]

      if (!atomName) {
        console.log('Missing atom data for file', file)

        continue
      }

      const atom = (await this.atoms)[atomName]

      if (!atom) {
        console.log('Atom data not found', atomName)

        continue
      }

      const fields: Array<ICreateFieldDTO> = await Promise.all(
        antdDesignFields.map(async (field) => {
          const existingField =
            this.existingData.fields[`${atom.api.name}-${field.property}`]

          const fieldType =
            (await getTypeForApi(field, atom, this.userId))?.existingId ?? ''

          // logger.info('Field Type', {
          //   existingField,
          //   name: `${atom.api.name}-${field.property}`,
          //   fieldType,
          // })

          return {
            id: existingField ? existingField.id : v4(),
            key: field.property,
            name: pascalCaseToWords(field.property),
            description: field.description,
            // Return empty string for filtering later
            fieldType,
            // Set default validation rules
            validationRules: {
              general: {
                nullable: true,
              },
            },
          }
        }),
      )

      const filteredFields = fields.filter(
        (field): field is ICreateFieldDTO => {
          return Boolean(field.fieldType)
        },
      )

      Object.assign(fieldDataKeyByApiId, { [atom.api.id]: filteredFields })
    }

    return fieldDataKeyByApiId
  }
}
