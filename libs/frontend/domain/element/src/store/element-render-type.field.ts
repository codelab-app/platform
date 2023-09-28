import {
  atomRef,
  componentRef,
  type IElementRenderTypeModel,
} from '@codelab/frontend/abstract/core'
import type {
  IElementDTO,
  IElementRenderTypeDto,
} from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { getEnumValue } from '@codelab/shared/utils'
import type { ModelPropTransform } from 'mobx-keystone'

/**
 * Doesn't work for refs, guessing it doesn't attach ref to root tree, so it can't resolve
 */
const _elementTypeTransform: ModelPropTransform<
  IElementRenderTypeDto,
  IElementRenderTypeModel
> = {
  untransform({ transformedValue, cacheTransformedValue }) {
    console.log('originalValue', transformedValue)
    const typename = getEnumValue(
      IElementRenderTypeKind,
      transformedValue.$modelType,
      (type) => {
        if (type === '@codelab/AtomRef') {
          return IElementRenderTypeKind.Atom
        }

        if (type === '@codelab/ComponentRef') {
          return IElementRenderTypeKind.Component
        }

        throw new Error('$modelType not found')
      },
    )

    console.log(typename)

    return {
      __typename: typename,
      id: transformedValue.id,
    }
  },
  transform({ originalValue, cachedTransformedValue, setOriginalValue }) {
    console.log('transformedValue', originalValue)
    if (originalValue.__typename === 'Atom') {
      return atomRef(originalValue.id)
    }

    if (originalValue.__typename === 'Component') {
      return componentRef(originalValue.id)
    }
    throw new Error('Incorrect __typename')
  },
}

export const elementTypeTransform = () => _elementTypeTransform

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
