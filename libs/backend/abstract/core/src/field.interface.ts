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
