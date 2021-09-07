import {
  AntdDesignApi,
  ServerConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { SeedBaseTypesService } from '@codelab/backend/modules/type'
import { AtomType } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Inject, Injectable } from '@nestjs/common'
import { GraphQLClient } from 'graphql-request'
import { Command, Console } from 'nestjs-console'
import { csvNameToAtomTypeMap } from './data/csvNameToAtomTypeMap'
import { allCustomAtomApiFactories } from './data/customAtomApis'
import { AtomSeeder, TypeSeeder } from './models'
import { iterateCsvs } from './utils/iterateCsvs'

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

  constructor(
    @Inject(serverConfig.KEY) private readonly _serverConfig: ServerConfig,
    private readonly seedBaseTypesService: SeedBaseTypesService,
    private readonly atomSeeder: AtomSeeder,
    private readonly typeSeeder: TypeSeeder,
  ) {}

  @Command({
    command: 'seed',
  })
  async seed() {
    /**
     * (1) Seed base types like String, Boolean, Integer so other types can use them
     */
    await this.seedBaseTypesService.execute()

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
    await iterateCsvs(this.antdDataFolder, this.handleCsv.bind(this))
    await iterateCsvs(
      this.customComponentsDataFolder,
      this.handleCsv.bind(this),
    )

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

  private async seedAtoms() {
    await this.typeSeeder.seedBaseTypes()

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

  private atomIdByAtomType() {
    return new Map(this.atoms.map(({ id, atomType }) => [atomType, id]))
  }

  private handleCsv(data: Array<AntdDesignApi>, file: string) {
    const atomType = csvNameToAtomTypeMap[file.replace('.csv', '')]

    if (!atomType) {
      return
    }

    const atomId = this.atomIdByAtomType().get(atomType)

    if (!atomId) {
      return
    }

    return this.typeSeeder.seedAtomApi(atomId, data)
  }
}
