import { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { MutationUpsertFieldArgs } from '@codelab/shared/abstract/codegen'

/**
 * The final output shape of the parser
 */
export interface FieldDataKeyByApiId {
  [apiId: string]: Array<ICreateFieldDTO>
}

export type IFieldImport = MutationUpsertFieldArgs

/**
 * Data output of parser service
 */
export interface AntDesignFieldsByFile {
  [file: string]: Array<AntdDesignField>
}

/**
 * The data format of the CSV row itself
 */
export interface AntdDesignField {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}
