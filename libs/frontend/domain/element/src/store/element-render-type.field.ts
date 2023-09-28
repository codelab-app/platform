import {
  atomRef,
  componentRef,
  type IElementRenderTypeModel,
} from '@codelab/frontend/abstract/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
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
