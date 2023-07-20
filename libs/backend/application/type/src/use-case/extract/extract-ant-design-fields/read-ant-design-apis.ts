import type { AntDesignApi } from '@codelab/backend/abstract/core'
import { AntDesignApiSchema } from '@codelab/backend/abstract/core'
import fs from 'fs'
import path from 'path'

export const readAntDesignApis = async (
  folder: string,
): Promise<Array<AntDesignApi>> => {
  const jsonFiles = fs.readdirSync(folder)
  const apis: Array<AntDesignApi> = []

  for (const file of jsonFiles) {
    const filePath = path.resolve(folder, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const apisData: Array<AntDesignApi> = JSON.parse(fileContent)

    apisData.forEach((data) => {
      return AntDesignApiSchema.parse(data)
    })

    apis.push(...apisData)
  }

  return apis
}
