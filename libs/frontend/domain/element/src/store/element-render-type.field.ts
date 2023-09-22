import {
  atomRef,
  componentRef,
  type IElementRenderTypeModel,
} from '@codelab/frontend/abstract/core'
import type {
  IElementDTO,
  IElementRenderType,
} from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { getEnumValue } from '@codelab/shared/utils'
import type { ModelPropTransform } from 'mobx-keystone'

const _renderTypeTransform: ModelPropTransform<
  IElementRenderTypeModel,
  IElementRenderType
> = {
  transform: ({ cachedTransformedValue, originalValue, setOriginalValue }) => {
    const typename = getEnumValue(
      IElementRenderTypeKind,
      originalValue.$modelType,
      (type) => {
        if (type === '@codelab/AtomRef') {
          return IElementRenderTypeKind.Atom
        }

        if (type === '@codelab/ComponeontRef') {
          return IElementRenderTypeKind.Component
        }

        throw new Error('$modelType not found')
      },
    )

    return {
      __typename: typename,
      id: originalValue.id,
    }
  },
  untransform: ({ cacheTransformedValue, transformedValue }) => {
    if (transformedValue.__typename === 'Atom') {
      return atomRef(transformedValue.id)
    }

    if (transformedValue.__typename === 'Component') {
      return componentRef(transformedValue.id)
    }

    throw new Error('__typename not valid')
  },
}

export const renderTypeTransform = () => _renderTypeTransform

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
