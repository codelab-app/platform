import type {
  AntDesignFieldsByFile,
  ExistingData,
  IAtomImport,
} from '@codelab/backend/abstract/core'
import type { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { atomTypeKeyByFileName } from '@codelab/shared/data'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { createAtomData } from './data/atom.data'
import { readCsvFiles } from './read-csv-files'
import { getTypeForApi } from './type-map'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class ParserService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private reactDataFolder = `${process.cwd()}/data/react/`

  private readonly atoms: { [atomName: string]: IAtomImport }

  constructor(private userId: string, private existingData: ExistingData) {
    // cLog('Existing Data', existingData)
    // logger.info('Existing Data', existingData)

    this.atoms = createAtomData(existingData)
      .map((atom) => ({
        [atom.name]: atom,
      }))
      .reduce(merge, {})
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async extractFieldData(): Promise<Array<ICreateFieldDTO>> {
    const antdCsvData = await readCsvFiles(this.antdDataFolder)
    const reactCsvData = await readCsvFiles(this.reactDataFolder)
    const csvData = { ...antdCsvData, ...reactCsvData }

    return this.transform(csvData)
  }

  private async transform(
    fieldsByFile: AntDesignFieldsByFile,
  ): Promise<Array<ICreateFieldDTO>> {
    const createFieldsDTO: Array<ICreateFieldDTO> = []

    for (const [file, atomFields] of Object.entries(fieldsByFile)) {
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

      const fields: Array<ICreateFieldDTO> = await atomFields.reduce<
        Promise<Array<ICreateFieldDTO>>
      >(async (accFields, field) => {
        const existingField =
          this.existingData.fields[`${atom.api.name}-${field.property}`]

        const fieldType =
          (await getTypeForApi(field, atom, this.userId))?.existingId ?? ''

        // logger.info('Field Type', {
        //   existingField,
        //   name: `${atom.api.name}-${field.property}`,
        //   fieldType,
        // })

        return [
          ...(await accFields),
          {
            id: existingField ? existingField.id : v4(),
            key: field.property,
            name: compoundCaseToTitleCase(field.property),
            description: field.description,
            // Return empty string for filtering later
            fieldType,
            // Set default validation rules
            validationRules: {
              general: {
                nullable: true,
              },
            },
            defaultValues: null,
            interfaceTypeId: atom.api.id,
          },
        ]
      }, Promise.resolve([]))

      const filteredFields = fields.filter(
        (field): field is ICreateFieldDTO => {
          return Boolean(field.fieldType)
        },
      )

      createFieldsDTO.push(...filteredFields)
    }

    return createFieldsDTO
  }
}
