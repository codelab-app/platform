import {
  AntdDesignApi,
  Auth0Service,
  ServerConfig,
  serverConfig,
} from '@codelab/backend'
import { AtomTypeEnum } from '@codelab/modules/atom-api'
import { snakeCaseToWords } from '@codelab/shared/utils'
import { Inject, Injectable } from '@nestjs/common'
import { GraphQLClient } from 'graphql-request'
import { Command, Console } from 'nestjs-console'
import { csvNameToAtomTypeMap } from './data/csvNameToAtomTypeMap'
import { AtomSeeder } from './models/atom-seeder'
import { TypeSeeder } from './models/type-seeder'
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

@Console()
@Injectable()
export class SeederService {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private customComponentsDataFolder = `${process.cwd()}/data/customComponents/`

  constructor(
    @Inject(serverConfig.KEY) private readonly _serverConfig: ServerConfig,
    private readonly auth0Service: Auth0Service,
  ) {}

  @Command({
    command: 'seed',
  })
  async seed() {
    const client = await this.getClient()
    const typeSeeder = new TypeSeeder(client)
    const atomSeeder = new AtomSeeder(client)

    /**
     * (1) Seed primitive types like String, Boolean, Integer so other types can use them
     */
    await typeSeeder.seedPrimitiveTypes()
    await typeSeeder.seedBaseTypes()

    /**
     * (2) Seed all Atoms
     */
    const allAtoms = await Promise.all(
      Object.values(AtomTypeEnum).map((atomType) =>
        atomSeeder
          .seedAtomIfMissing({
            type: atomType as any,
            name: snakeCaseToWords(atomType),
          })
          .then((id) => ({ id, atomType })),
      ),
    )

    const atomIdByAtomType = new Map(
      allAtoms.map(({ id, atomType }) => [atomType, id]),
    )

    /**
     * (3) Seed all Atoms API's that we have data for
     */
    const handleCsv = async (data: Array<AntdDesignApi>, file: string) => {
      const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]

      if (!atomType) {
        return
      }

      const atomId = atomIdByAtomType.get(atomType as any)

      if (!atomId) {
        return
      }

      return typeSeeder.seedAtomApi(atomId, data)
    }

    await iterateCsvs(this.antdDataFolder, handleCsv)
    await iterateCsvs(this.customComponentsDataFolder, handleCsv)
  }

  private async getClient() {
    const accessToken = await this.auth0Service.getAccessToken()

    const client = new GraphQLClient(
      new URL('graphql', this._serverConfig.endpoint).toString(),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return client
  }
}
