import {
  AntdDesignApi,
  Auth0Service,
  ServerConfig,
  serverConfig,
} from '@codelab/backend'
import {
  GetTypeGql,
  GetTypeQueryResult,
  GetTypeQueryVariables,
} from '@codelab/codegen/graphql'
import { Inject, Injectable } from '@nestjs/common'
import csv from 'csv-parser'
import fs from 'fs'
import { GraphQLClient } from 'graphql-request'
import { Command, Console } from 'nestjs-console'
import path from 'path'

@Console()
@Injectable()
export class SeederService {
  private antDesignFolder = `${process.cwd()}/data/antd/`

  constructor(
    @Inject(serverConfig.KEY) private readonly _serverConfig: ServerConfig,
    private readonly auth0Service: Auth0Service,
  ) {}

  /**
   * (1) Seed primitive types like String, Boolean, Integer so other types can use them
   */
  @Command({
    command: 'seed',
  })
  async seed() {
    const client = await this.getClient()

    await this.seedPrimitiveTypes(client)
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

  /**
   * Import Ant Design .csv props files to our system
   */
  private async importAntCsvData() {
    fs.readdirSync(this.antDesignFolder)
      .slice(0, 1)
      .forEach((file) => {
        const results: Array<AntdDesignApi> = []
        console.log(file)

        fs.createReadStream(path.resolve(this.antDesignFolder, file))
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            // Seed here
            console.log(results)
          })

        /*
          Run this to print the file contents
          console.log(readFileSync(".levels/" + file, {encoding: "utf8"}))
        */

        // try {
        //   const parser = new Parser({ fields: antdTableKeys })
        //   const csv = parser.parse(fileContents)
        //   console.log(csv)
        // } catch (err) {
        //   console.error(err)
        // }
      })

    // // but if your goal is just to print the file name you can do this
    // fs.readFileSync('.levels/').forEach(console.log)
  }

  private async seedPrimitiveTypes(client: GraphQLClient) {
    const results = await client.request<
      GetTypeQueryResult,
      GetTypeQueryVariables
    >(GetTypeGql, { input: { where: { name: 'Strings' } } })

    console.log(results)
  }
}
