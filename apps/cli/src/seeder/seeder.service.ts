import {
  AntdDesignApi,
  Auth0Service,
  ErrorCode,
  ServerConfig,
  serverConfig,
} from '@codelab/backend'
import {
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutationResult,
  CreateTypeMutationVariables,
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
import { primitiveTypes } from './data/primitiveTypes'

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
    await Promise.all(
      primitiveTypes.map((primitiveType) =>
        this.seedTypeIfNotExisting(client, primitiveType).then((id) => ({
          primitiveType,
          id,
        })),
      ),
    )
  }

  /**
   * Checks if a type with the same name exists, if not - creates it
   * Returns the id in both cases
   */
  private async seedTypeIfNotExisting(
    client: GraphQLClient,
    typeInput: CreateTypeInput,
  ): Promise<string> {
    const isNotFoundError = (e: any) =>
      Array.isArray(e.response?.errors) &&
      e.response?.errors.length > 0 &&
      e.response?.errors[0] &&
      e.response?.errors[0].code === ErrorCode.NotFound

    const createType = async () => {
      const createResponse = await client.request<
        CreateTypeMutationResult['data'],
        CreateTypeMutationVariables
      >(CreateTypeGql, {
        input: typeInput,
      })

      if (!createResponse?.createType) {
        throw new Error(
          `Something went wrong while creating type ${typeInput.name}`,
        )
      }

      console.log(`Created type ${typeInput.name}`)

      return createResponse.createType.id
    }

    try {
      const results = await client.request<
        GetTypeQueryResult['data'],
        GetTypeQueryVariables
      >(GetTypeGql, { input: { where: { name: typeInput.name } } })

      if (!results?.getType) {
        return createType()
      }

      console.log(`Type ${typeInput.name} exists, skipping`)

      return results.getType.id
    } catch (e) {
      if (isNotFoundError(e)) {
        return createType()
      }

      throw e
    }
  }
}
