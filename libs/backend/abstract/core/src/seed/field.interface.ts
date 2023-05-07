/**
 * The data format of the CSV row itself
 */
export interface AntDesignField {
  defaultValue: string
  description: string
  property: string
  /**
   * The type is the most important, we parse this into our type schema
   */
  type: string
  version: string
}

/**
 * This is field of chatgpt generated data
 */
export interface HtmlField {
  key: string
  type: string
}
