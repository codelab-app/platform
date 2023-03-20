/**
 * Data output of parser service
 */
export interface AntDesignFieldsByFile {
  [file: string]: Array<AntDesignField>
}

/**
 * The data format of the CSV row itself
 */
export interface AntDesignField {
  default: string
  description: string
  isEnum: boolean
  property: string
  /**
   * The type is the most important, we parse this into our type schema
   */
  type: string
  version: string
}
