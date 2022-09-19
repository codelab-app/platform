import { IAtomExport, ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { AntdDesignApi, createAntDesignAtomsData } from './ant-design'
import { csvNameToAtomTypeMap } from './csvNameToAtomTypeMap'
import { iterateCsvs } from './iterateCsv'
import { getTypeForApi } from './type-map'

interface ApiData {
  fields: Array<ICreateFieldDTO>
  atom: IAtomExport
}

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 */
export class ParserService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private customComponentsDataFolder = `${process.cwd()}/data/customComponents/`

  /**
   * An array of future created atoms, we first build out the pipeline, then call it with input data later
   *
   * Map of atom type to export data
   */
  private _atoms: Promise<Map<string, IAtomExport>>

  public apis: Array<ApiData> = []

  private userId: string

  constructor(userId: string) {
    this.userId = userId
    this._atoms = createAntDesignAtomsData().then(
      (data) => new Map(data.map((atom) => [atom.type, atom])),
    )
  }

  /**
   * Extract data to be used for seeding
   */
  async extractFields() {
    await iterateCsvs(this.antdDataFolder, await this.handleCsv.bind(this))

    return this.apis
  }

  private async handleCsv(data: Array<AntdDesignApi>, file: string) {
    const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]
    const customType = [] as Array<string>

    if (!atomType) {
      return
    }

    const atom = (await this._atoms).get(atomType)

    if (!atom) {
      return
    }

    const fields: Array<ICreateFieldDTO> = await Promise.all(
      data.map(async (field) => {
        if (field.type.includes('|') && !customType.includes(field.type)) {
          customType.push(field.type)
        }

        return {
          id: v4(),
          key: field.property,
          name: pascalCaseToWords(field.property),
          description: field.description,
          fieldType:
            (await getTypeForApi(field, atom, this.userId))?.existingId ?? '',
        }
      }),
    )

    if (customType.length > 0) {
      console.log('customType:', customType)
    }

    const filteredFields = fields.filter((field): field is ICreateFieldDTO => {
      return Boolean(field.fieldType)
    })

    this.apis.push({
      fields: filteredFields,
      atom,
    })
  }
}
