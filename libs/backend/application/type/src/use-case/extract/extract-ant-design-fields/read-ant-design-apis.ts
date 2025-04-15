import {
  AntDesignApiSchema,
  type IAntDesignApi,
} from '@codelab/backend-abstract-core'
import { Value } from '@sinclair/typebox/value'
import fs from 'fs'
import path from 'path'

export const readAntDesignApis = async (
  folder: string,
): Promise<Array<IAntDesignApi>> => {
  const jsonFiles = fs.readdirSync(folder)
  const apis: Array<IAntDesignApi> = []

  for (const file of jsonFiles) {
    const filePath = path.resolve(folder, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const apisData: Array<IAntDesignApi> = JSON.parse(fileContent)

    apisData.forEach((data) => {
      return Value.Decode(AntDesignApiSchema, data)
    })

    apis.push(...apisData)
  }

  return apis
}
