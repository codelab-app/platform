import * as path from 'path'
import { generate } from '@graphql-codegen/cli'
import * as glob from 'glob'

const outputFile = 'graphql.ts'

const graphqlQueryPaths = glob.sync(
  `${process.cwd()}/libs/modules/*@(-stories)/src/useCases/**/*.graphql`,
)

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
      schema: 'http://localhost:3333/graphql',
      documents: sourceGqlPath,
      // type error, need to stub
      // eslint-ignore next-line
      hooks: {
        afterStart: [],
        beforeDone: [],
        onWatchTriggered: [],
        onError: [],
        afterOneFileWrite: [],
        afterAllFileWrite: ['eslint --fix'],
        beforeOneFileWrite: [],
        beforeAllFileWrite: [],
      },
      generates: {
        [`${useCaseDirectory}/${filenameWithoutExtension}.generated.ts`]: {
          plugins: ['typescript-document-nodes'],
        },
      },
    },
    true,
  )
}

export const main = async () => {
  const generators = graphqlQueryPaths.map((queryPath) => {
    return makeGenerator({ sourceGqlPath: queryPath })
  })

  // console.log(generatedFiles)

  // fs.writeFile(path.join(process.cwd(), outputFile), output, () => {
  //   console.log('Outputs generated!')
  // })
}

main()
