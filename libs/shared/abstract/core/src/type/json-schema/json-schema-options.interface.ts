import { IType } from '../types/type.interface'

export interface IJsonSchemaOptions {
  /** Max amount of type nesting that's allowed, used to prevent infinite loops. Defaults to 100 */
  maxNesting?: number

  /** Use this to add data to the property definitions  */
  jsonPropertiesMapper?: (type: IType) => Record<string, any>
}
