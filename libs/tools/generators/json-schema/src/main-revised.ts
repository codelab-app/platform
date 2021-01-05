import { execSync } from 'child_process'
import { createWriteStream, writeFileSync } from 'fs'
import { resolve } from 'path'

try {
  const cmd = `npx typescript-json-schema libs/modules/graph/tsconfig.lib.json "*" --include libs/modules/**/src/core/application/useCases/**/*Request.ts --refs false`

  const jsonSchemaString = execSync(cmd).toString()

  const schemaOutputPath = resolve(__dirname, 'generated/index.ts')

  writeFileSync(schemaOutputPath, '')

  const stream = createWriteStream(schemaOutputPath, { flags: 'a' })

  stream.write(
    `export const requestJsonSchema =
      ${jsonSchemaString}`,
    () => execSync(`npx eslint ${schemaOutputPath} --fix`),
  )

  stream.end()
} catch (error) {
  console.log(error)
  // error.status // 0 : successful exit, but here in exception it has to be greater than 0
  // error.message // Holds the message you typically want.
  // error.stderr // Holds the stderr output. Use `.toString()`.
  // error.stdout // Holds the stdout output. Use `.toString()`.
}
