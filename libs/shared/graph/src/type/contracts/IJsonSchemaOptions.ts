import { ITypeVertex } from './ITypeVertex'

export interface IJsonSchemaOptions {
  /** Max amount of type nesting that's allowed, used to prevent infinite loops. Defaults to 100 */
  maxNesting?: number

  /** Use this to add data to the property definitions  */
  jsonPropertiesMapper?: (type: ITypeVertex) => Record<string, any>
}
