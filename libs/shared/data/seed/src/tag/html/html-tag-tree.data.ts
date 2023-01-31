import type { TagNode } from '../antd'
import { HtmlTag } from './html-tags.data'

/**
 * Taken from here https://www.w3schools.com/TAGS/ref_byfunc.asp
 */
export const htmlTagTree: Partial<Record<HtmlTag, Array<TagNode>>> = {
  [HtmlTag.Basic]: [HtmlTag.Html],
}
