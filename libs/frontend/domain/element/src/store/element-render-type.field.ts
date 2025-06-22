import type { IElementDto } from '@codelab/shared-abstract-core'

import {
  atomRef,
  componentRef,
  type IElementRenderTypeModel,
} from '@codelab/frontend-abstract-domain'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'

export const getRenderType = (
  renderType: IElementDto['renderType'],
): IElementRenderTypeModel => {
  switch (renderType.__typename) {
    case IElementRenderTypeKind.Atom: {
      return atomRef(renderType.id)
    }

    case IElementRenderTypeKind.Component: {
      return componentRef(renderType.id)
    }

    default: {
      throw new Error('Missing __typename')
    }
  }
}
