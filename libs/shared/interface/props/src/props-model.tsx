/**
 * Model
 */
export interface PropsModel {
  name: string
}

/**
 * Schema
 */
export interface PropsSchema {
  [name: string]: PropsSchemaOptions
}

export interface PropsSchemaOptions {
  type: string
  ref?: string
  enum?: Array<string>
}
