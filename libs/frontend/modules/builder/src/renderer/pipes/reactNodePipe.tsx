import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues } from 'lodash'
import React from 'react'
import { transformPropsToComponentFn } from '../utils'
import { getPropsByTypeKind } from '../utils/getPropsByTypeKind'
import { RenderPipeFactory } from './types'

/**
 * Transforms the react node props
 */
export const reactNodePipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const reactNodeProps = getPropsByTypeKind(props, TypeKind.ReactNodeType)

    const transformedProps = transformPropsToComponentFn(
      reactNodeProps,
      context,
      props,
    )

    const components = mapValues(transformedProps, (RenderedComponent) => (
      <RenderedComponent />
    ))

    return next(element, context, mergeProps(props, components))
  }
