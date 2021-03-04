import P from 'bluebird'
import * as glob from 'glob'
import { generateSchemas } from '@codelab/tools/generators/form-decorator'

const bootstrap = async () => {
  const files = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  })

  // 1) Reduce exports to single file
  // 2) Should work for normal tsed decorators as well
  // 3) form-decorator should only generate schema, creating exports & merging into single file we'll do here
  await P.reduce(
    files,
    async (acc, file) => {
      const module = await import(file)
      const schema = generateSchemas(module)

      console.log(schema)
    },
    {},
  )
}

bootstrap()
