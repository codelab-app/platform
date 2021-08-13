import {
  AntdDesignApi,
  Auth0Service,
  ServerConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { AtomTypeEnum } from '@codelab/backend/modules/atom'
import {
  __AtomFragment,
  AtomType,
  CreateAtomMutation,
  CreateAtomMutationResult,
} from '@codelab/shared/codegen/graphql'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Inject, Injectable } from '@nestjs/common'
import { GraphQLClient } from 'graphql-request'
import { Command, Console } from 'nestjs-console'
import { csvNameToAtomTypeMap } from './data/csvNameToAtomTypeMap'
import { allCustomAtomApiFactories } from './data/customAtomApis'
import { AtomSeeder, TypeSeeder } from './models'
import { iterateCsvs } from './utils/iterateCsvs'

/**
 * Idea to improve data management:
 * Create a libraries.(json/js/ts) in /data dir
 * In it we have an array of libraries - their names, and a path to a directory that contains the data
 * e.g. [{name: "Ant Design", dataDir: "data/antd/"}]
 *
 * In each data dir (data/antd for example), we keep a atoms.(json/js/ts)
 * atoms.(json/js/ts) will contain a list of Atoms for this library, with the same structure, but will contain the AtomType:
 * [{name: "Button", file: "Button.csv", atomType: AtomType.Button}]
 *
 * The csv file will contain standardized across all libraries data for the API - things like key, type, etc.
 * Scrapers will do the work to format the specific data (say from AntD API docs) to our standardized data
 *
 * The Seeder will create the libraries, all of the atoms inside them and the types for them
 */

interface AtomSeed {
  id: string
  atomType: AtomType
}

@Console()
@Injectable()
export class SeederService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private customComponentsDataFolder = `${process.cwd()}/data/customComponents/`

  /**
   * An array of future created atoms, we first build out the pipeline, then call it with input data later
   */
  private atoms: Array<AtomSeed> = []

  private atomSeeder: AtomSeeder

  private typeSeeder: TypeSeeder

  constructor(
    @Inject(serverConfig.KEY) private readonly _serverConfig: ServerConfig,
    accessToken: string,
  ) {
    const client = this.getClient(accessToken)

    this.atomSeeder = new AtomSeeder(client)
    this.typeSeeder = new TypeSeeder(client, this.atomSeeder)
  }

  @Command({
    command: 'seed',
  })
  async seed() {
    /**
     * (1) Seed base types like String, Boolean, Integer so other types can use them
     */
    await this.typeSeeder.seedBaseTypes()

    /**
     * (2) Seed all Atoms
     */
    this.atoms = await this.seedAtoms()

    /**
     * (3) Wrap all Atoms with a Component
     */

    /**
     * (3) Seed all Atoms API's that we have data for
     */
    await iterateCsvs(this.antdDataFolder, this.handleCsv)
    await iterateCsvs(this.customComponentsDataFolder, this.handleCsv)

    /**
     * (4) Seed all the custom atom API's
     */
    await this.typeSeeder.seedCustomAtomApis(allCustomAtomApiFactories)
  }

  private getClient(accessToken: string) {
    return new GraphQLClient(
      new URL('graphql', this._serverConfig.endpoint).toString(),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  private seedAtoms() {
    return Promise.all(
      Object.values(AtomType).map((atomType) =>
        this.atomSeeder
          .seedAtomIfMissing({
            type: atomType,
            name: pascalCaseToWords(atomType),
          })
          .then((id) => ({ id, atomType })),
      ),
    )
  }

  private get atomIdByAtomType() {
    return new Map(this.atoms.map(({ id, atomType }) => [atomType, id]))
  }

  private async handleCsv(data: Array<AntdDesignApi>, file: string) {
    const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]

    if (!atomType) {
      return
    }

    const atomId = this.atomIdByAtomType.get(atomType as any)

    if (!atomId) {
      return
    }

    return this.typeSeeder.seedAtomApi(atomId, data)
  }
}
