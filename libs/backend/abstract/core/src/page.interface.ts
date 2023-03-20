import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IElementExport } from './element.interface'

export type IPageExport = Pick<
  OGM_TYPES.Page,
  'id' | 'kind' | 'name' | 'pageContentContainer'
> & {
  components: Array<OGM_TYPES.Component>
  elements: Array<OGM_TYPES.Element>
  rootElement: Pick<IElementExport, 'id' | 'name'>
}
