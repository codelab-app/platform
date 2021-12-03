import { loadFilesSync } from '@graphql-tools/load-files'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GraphqlSchemaService {
  getEnumTypeDef(enumType: string, schema: string) {
    const regex = new RegExp(`(?:enum)\\s${enumType}\\s(.+?)}`, 'gs')

    return schema.match(regex)?.[0] ?? ''
  }

  /**
   * Load *.graphql file as string
   */
  loadGraphqlSchema(schemaPath: string) {
    return loadFilesSync<string>(schemaPath, {
      extensions: ['graphql'],
    })
  }
}
