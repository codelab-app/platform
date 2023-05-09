import type { Element, Page } from '@codelab/backend/abstract/codegen'
import type { IElementExport } from './element.interface'

export type IPageExport = Pick<
  Page,
  'id' | 'kind' | 'name' | 'pageContentContainer' | 'store' | 'url'
> & {
  elements: Array<Element>
  rootElement: Pick<IElementExport, 'id' | 'name'>
}
