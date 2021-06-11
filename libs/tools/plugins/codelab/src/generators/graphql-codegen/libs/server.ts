import { ChildProcess } from 'child_process'
import shell from 'shelljs'
import { NormalizedSchema } from '../generator'
import { GraphqlCodegenGeneratorSchema } from '../schema'

export const startApiServer = async (
  options: NormalizedSchema,
): Promise<ChildProcess | undefined> => {
  const { apiPortIsOpen } = options

  if (apiPortIsOpen) {
    return shell.exec('node dist/apps/api/main.js', {
      async: true,
      cwd: process.cwd(),
    })
  }

  return
}
