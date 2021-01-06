import * as path from 'path'
import { generate } from '@graphql-codegen/cli'
import * as glob from 'glob'

interface GeneratorOptions {
  sourceGqlPath: string
}

const makeGenerator = async (option: GeneratorOptions) => {
  const { sourceGqlPath } = option

  const useCaseDirectory = path.dirname(sourceGqlPath)
  const filenameWithoutExtension = path.basename(sourceGqlPath, '.graphql')

  console.log(useCaseDirectory, filenameWithoutExtension)

  return generate(
    {
      schema: 'http://localhost:4001/graphql',
      documents: sourceGqlPath,
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
      generates: {
        [`${useCaseDirectory}/${filenameWithoutExtension}.generated.ts`]: {
          plugins: [
            {
              'typescript-document-nodes': {
                nameSuffix: 'Gql',
              },
            },
          ],
        },
      },
    },
    true,
  )
}

const graphqlQueryPaths = glob.sync(
  `${process.cwd()}/libs/modules/*@(-stories)/src/useCases/**/*.graphql`,
)

export const getGenerators = () =>
  graphqlQueryPaths.map((queryPath) =>
    makeGenerator({ sourceGqlPath: queryPath }),
  )
