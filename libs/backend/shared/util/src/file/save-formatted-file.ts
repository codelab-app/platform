import type { ObjectLike } from '@codelab/shared-abstract-types'

import { prettifyForConsole } from '@codelab/shared-utils'
import fs from 'fs'
import { EOL } from 'os'
import { dirname, resolve } from 'path'
import { format } from 'prettier'

export const saveFormattedFile = (outputFilePath: string, data: ObjectLike) => {
  if (!outputFilePath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = prettifyForConsole(data)
  const exportPath = resolve('./', outputFilePath)

  fs.mkdirSync(dirname(exportPath), { recursive: true })
  fs.writeFileSync(exportPath, json)
  fs.appendFileSync(exportPath, EOL, 'utf8')
}

export const formatToPrettifiedJson = (
  data: Array<ObjectLike> | ObjectLike,
) => {
  const jsonString = prettifyForConsole(data)
  const prettifiedJsonString = format(jsonString, { parser: 'json' })

  return prettifiedJsonString
}
