import { OGM_TYPES } from '@codelab/backend/abstract/codegen'

export interface ITagExport {
  id: string
  name: string
  children?: Array<Pick<OGM_TYPES.Tag, 'id' | 'name'>>
  parent?: Pick<OGM_TYPES.Tag, 'id' | 'name'>
}
