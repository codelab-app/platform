import { prettifyForConsole } from '@codelab/shared/utils'
import fs from 'fs'
import { EOL } from 'os'
import * as path from 'path'
import prettier from 'prettier'

export const saveFormattedFile = (outputFilePath: string, data: object) => {
  if (!outputFilePath.endsWith('.json')) {
    throw new Error('Output path must end with .json')
  }

  const json = prettifyForConsole(data)
  const exportPath = path.resolve('./', outputFilePath)

  fs.mkdirSync(path.dirname(exportPath), { recursive: true })
  fs.writeFileSync(exportPath, json)
  fs.appendFileSync(exportPath, EOL, 'utf8')
}

export const formatToPrettifiedJson = (data: object) => {
  const jsonString = prettifyForConsole(data)
  const prettifiedJsonString = prettier.format(jsonString, { parser: 'json' })

  return prettifiedJsonString
}
