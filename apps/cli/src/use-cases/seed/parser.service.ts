import {
  InterfaceTypeOGM,
  interfaceTypeSelectionSet,
} from '@codelab/backend/adapter/neo4j'
import { IAtomExport, ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { csvNameToAtomTypeMap } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { AntdDesignApi, createAntDesignAtomsData } from './data/ant-design.data'
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
  private atoms: Promise<Map<string, IAtomExport>>

  public apis: Array<ApiData> = []

  private userId: string

  constructor(userId: string) {
    this.userId = userId
    this.atoms = createAntDesignAtomsData().then(
      (data) => new Map(data.map((atom) => [atom.type, atom])),
    )
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async extractMappedFields() {
    await iterateCsvs(this.antdDataFolder, await this.handleCsv.bind(this))

    return this.apis
  }

  private async handleCsv(data: Array<AntdDesignApi>, file: string) {
    const atomType = csvNameToAtomTypeMap.get(file.replace('.csv', ''))

    if (!atomType) {
      console.log('Missing atom data for file', file)

      return
    }

    const atom = (await this.atoms).get(atomType)

    if (!atom) {
      return
    }

    /**
     * Here we need to fetch
     */
    const InterfaceType = await InterfaceTypeOGM()

    /**
     * Key by composite key with interfaceId & fieldKey
     */
    const interfaceTypes = await InterfaceType.find({
      selectionSet: interfaceTypeSelectionSet,
    })

    const existingFieldsMap = new Map(
      // Create Array<[ref, field]>
      interfaceTypes.flatMap((interfaceType) =>
        interfaceType.fieldsConnection.edges.map((field) => [
          `${interfaceType.id}-${field.key}`,
          field,
        ]),
      ),
    )

    const fields: Array<ICreateFieldDTO> = await Promise.all(
      data.map(async (field) => ({
        id:
          existingFieldsMap.get(`${atom.api.id}-${field.property}`)?.id ?? v4(),
        key: field.property,
        name: pascalCaseToWords(field.property),
        description: field.description,
        fieldType:
          (await getTypeForApi(field, atom, this.userId))?.existingId ?? '',
      })),
    )

    const filteredFields = fields.filter((field): field is ICreateFieldDTO => {
      return Boolean(field.fieldType)
    })

    this.apis.push({
      fields: filteredFields,
      atom,
    })
  }
}
