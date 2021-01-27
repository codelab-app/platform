import * as path from 'path'
import { generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { makeGeneratesConfig, sharedConfigs } from './generator-config'

interface GeneratorOptions {
  sourceGqlPaths: Array<string>
}

export const makeAsyncGenerator = async ({
  sourceGqlPaths,
}: GeneratorOptions) => {
  const generatesConfig: Types.Config['generates'] = sourceGqlPaths.reduce(
    (config, sourceGqlPath) => {
      const useCaseDirectory = path.dirname(sourceGqlPath)
      const filenameWithoutExtension = path.basename(sourceGqlPath, '.graphql')

      // console.log(useCaseDirectory, filenameWithoutExtension)

      return {
        ...config,
        ...makeGeneratesConfig({
          useCaseDirectory,
          filenameWithoutExtension,
          sourceGqlPath,
        }),
      }
    },
    sharedConfigs,
  )

  // console.log(generatesConfig)

  return await generate(
    {
      schema: 'http://localhost:4001/graphql',
      // type error, need to stub
      // eslint-ignore next-line
      hooks: {
        afterStart: [],
        beforeDone: [],
        onWatchTriggered: [],
        onError: [],
        afterOneFileWrite: [],
        afterAllFileWrite: ['npx eslint --fix'],
        beforeOneFileWrite: [],
        beforeAllFileWrite: [],
      },
      generates: generatesConfig,
    },
    true,
  )
}
