import { IAtomExport, ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { AntdDesignApi, createAntDesignAtomsData } from './ant-design'
import { csvNameToAtomTypeMap } from './csvNameToAtomTypeMap'
import { iterateCsvs } from './iterateCsv'

interface ApiData {
  api: {
    id: string
    fields: ICreateFieldDTO
  }
}

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 */
export class SeederService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private customComponentsDataFolder = `${process.cwd()}/data/customComponents/`

  /**
   * An array of future created atoms, we first build out the pipeline, then call it with input data later
   *
   * Map of atom type to export data
   */
  private _atoms: Promise<Map<string, IAtomExport>>

  public apis: Array<ApiData> = []

  constructor() {
    this._atoms = createAntDesignAtomsData().then(
      (data) => new Map(data.map((atom) => [atom.type, atom])),
    )
  }

  async seed() {
    console.log('Seed!')

    /**
     * (1) Seed base types like String, Boolean, Integer so other types can use them
     */
    /**
     * (2) Seed all atom apis
     */
    return await iterateCsvs(
      this.antdDataFolder,
      await this.handleCsv.bind(this),
    )
  }

  private async handleCsv(data: Array<AntdDesignApi>, file: string) {
    const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]

    if (!atomType) {
      return
    }

    const atom = (await this._atoms).get(atomType)

    const fields = data.map((field) => ({
      key: field.property,
      name: pascalCaseToWords(field.property),
      description: field.description,
      fieldType: '',
    }))

    const api = {
      id: atom?.api?.id,
      fields: fields,
    }

    // this.apis.push(api)

    // if (!atomId) {
    //   return
    // }

    // return this.typeSeeder.seedAtomApi(atomId, data, currentUser)
  }
}
