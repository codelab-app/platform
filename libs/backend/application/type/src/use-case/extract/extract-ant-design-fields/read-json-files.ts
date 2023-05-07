import type { AntDesignApi } from '@codelab/backend/abstract/core'
import fs from 'fs'
import path from 'path'

export const readJsonFiles = async (
  folder: string,
): Promise<Array<AntDesignApi>> => {
  const jsonFiles = fs.readdirSync(folder)
  const apis: Array<AntDesignApi> = []

  for (const file of jsonFiles) {
    const filePath = path.resolve(folder, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const api: Array<AntDesignApi> = JSON.parse(fileContent)

    apis.push(...api)
  }

  return apis
}
