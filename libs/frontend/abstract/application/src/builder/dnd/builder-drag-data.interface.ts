import type { IElementRenderTypeDto } from '@codelab/shared/abstract/core'

import type { BuilderDndAction } from './builder-dnd-action'

export interface BuilderDragData {
  action: BuilderDndAction
  elementRenderType?: IElementRenderTypeDto
  icon?: string
  name?: string
}
