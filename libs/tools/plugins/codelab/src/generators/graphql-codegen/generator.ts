import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit'
import {
  ChildProcess,
  exec,
  execFile,
  execSync,
  spawn,
  spawnSync,
} from 'child_process'
import { config } from 'dotenv'
import { get } from 'env-var'
import { Server } from 'http'
import * as path from 'path'
import { format as prettyFormat } from 'pretty-format'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { isPortOpen } from '../../utils/server'
import { generateSchemaWithExtractedEnum } from './libs/generateSchema'
import { generateApi, generateDgraph } from './libs/graphqlCodegen'
import { startApiServer } from './libs/server'
import { updateDgraphSchema } from './libs/updateDgraphSchema'
import { GraphqlCodegenGeneratorSchema } from './schema'

config()

export interface NormalizedSchema extends GraphqlCodegenGeneratorSchema {
  dgraphPort: number
  codelabApiGraphqlEndpoint: string
  CODELAB_API_ENDPOINT: string
  CODELAB_DGRAPH_GRAPHQL_ENDPOINT: string
  apiPort: number
  apiPortIsOpen: boolean
}

const normalizeOptions = async (
  host: Tree,
  options: GraphqlCodegenGeneratorSchema,
): Promise<NormalizedSchema> => {
  const { env } = options
  const dgraphPort = env === 'dev' ? 8081 : 8082

  const codelabApiGraphqlEndpoint = new URL(
    'graphql',
    get('CODELAB_API_ENDPOINT').required().asUrlString(),
  ).toString()

  const CODELAB_API_ENDPOINT = get('CODELAB_API_ENDPOINT')
    .required()
    .asUrlString()

  const CODELAB_DGRAPH_GRAPHQL_ENDPOINT = get('CODELAB_DGRAPH_GRAPHQL_ENDPOINT')
    .required()
    .asUrlString()

  const apiPort = parseInt(new URL(codelabApiGraphqlEndpoint).port)
  const apiPortIsOpen = await isPortOpen(apiPort)

  return {
    ...options,
    dgraphPort,
    codelabApiGraphqlEndpoint,
    CODELAB_DGRAPH_GRAPHQL_ENDPOINT,
    CODELAB_API_ENDPOINT,
    apiPort,
    apiPortIsOpen,
  }
}

export default async function (
  host: Tree,
  options: GraphqlCodegenGeneratorSchema,
) {
  const normalizedOptions = await normalizeOptions(host, options)
  /**
   * (1) Start Nest.js GraphQL API.
   *
   * Nest.js GraphQL is code driven, so starting the server will produce a GraphQL schema file.
   */
  const apiServer = await startApiServer(normalizedOptions)

  /**
   * Generate graphql types & apollo queries/mutations
   */
  try {
    await waitOn({
      resources: [normalizedOptions.CODELAB_API_ENDPOINT],
      timeout: 10000,
    })

    /**
     * Generate codegen from Nest.js GraphQL API
     */
    await generateApi(normalizedOptions)

    /**
     * (2) Extract enum's from Nest.js GraphQL api, merge with Dgraph schema file to produce a new schema file
     *
     * Our GraphQL enum's are code driven, and there is no way to reproduce this enum in the Dgraph schema file without a custom merge script.
     */
    generateSchemaWithExtractedEnum()

    /**
     * (3) We take this generated schema file & initialize Dgraph schema with it.
     *
     * Dgraph is GraphQL schema driven.
     */
    updateDgraphSchema(normalizedOptions)

    /**
     * (4) We then call GraphQL codegen on the Dgraph schema.
     *
     * To introspect the Dgraph schema & generate any Apollo functions.
     */
    await generateDgraph(normalizedOptions)

    process.env['DOTENV_CONFIG_PATH'] = '.env'

    apiServer?.kill('SIGKILL')
  } catch (err) {
    console.error(err)

    apiServer?.kill('SIGKILL')
  }

  //     .then(() => {
  //       const codegenProcess = shell.exec(
  //         `yarn graphql-codegen ${
  //           normalizedOptions.watch ? '--watch' : ''
  //         } --require dotenv/config --config .graphqlconfig.yaml`,
  //         { cwd: process.cwd() },
  //       )

  //       apiServer?.kill('SIGKILL')
  //     })
  //     .catch((err) => {
  //       console.error('error', err)
  //     })
}
