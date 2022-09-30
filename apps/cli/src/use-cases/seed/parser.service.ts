import {
  AntDesignFieldsByFile,
  ExistingData,
  FieldDataByAtom,
  IAtomImport,
  ICreateFieldDTO,
} from '@codelab/shared/abstract/core'
import { csvNameToAtomTypeMap, getApiName } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { createAntdAtomData } from './data/ant-design-atom.data'
import { readCsvFiles } from './read-csv-files'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class ParserService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private readonly atoms: { [atomName: string]: IAtomImport }

  constructor(private existingData: ExistingData) {
    this.atoms = createAntdAtomData(existingData).reduce(
      (record, atom) => ({
        ...record,
        [atom.name]: atom,
      }),
      {},
    )
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async extractFieldDataByApiName(): Promise<FieldDataByAtom> {
    const csvData = await readCsvFiles(this.antdDataFolder)

    return this.transform(csvData)
  }

  private async transform(
    fieldsByFile: AntDesignFieldsByFile,
  ): Promise<FieldDataByAtom> {
    const parsedApiData: FieldDataByAtom = new Map()

    for (const [file, antdDesignFields] of Object.entries(fieldsByFile)) {
      const atomName = csvNameToAtomTypeMap.get(file.replace('.csv', ''))

      if (!atomName) {
        console.log('Missing atom data for file', file)

        continue
      }

      const atom = (await this.atoms)[atomName]

      if (!atom) {
        console.log('Atom data not found', atomName)

        continue
      }

      const fields: Array<ICreateFieldDTO> = antdDesignFields.map((field) => {
        const existingField =
          this.existingData.fields[`${getApiName(atomName)}-${field.property}`]

        const existingApi = this.existingData.api[getApiName(atomName)]

        return {
          id: existingField ? existingField.id : v4(),
          key: field.property,
          name: pascalCaseToWords(field.property),
          description: field.description,
          fieldType: existingApi?.id,
        }
      })

      parsedApiData.set(atom, fields)
    }

    return parsedApiData
  }
}
