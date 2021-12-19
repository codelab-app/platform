import { mergeProps } from '@codelab/shared/utils'
import * as _ from 'lodash'
import React from 'react'
import { RenderContext } from '../pipes'

export const transformPropsToComponent = (
  props: Record<string, any>,
  context: RenderContext,
  isRender = false,
  allProps: Record<string, any>,
) => {
  return _.mapValues(props, (value) => {
    const componentId = value?.id

    if (!componentId) {
      return
    }

    const component = context.tree.getComponentById(componentId)

    if (!component) {
      console.warn(
        'transformPropsToComponent',
        `Cant find component id ${componentId}`,
      )

      return
    }

    const RenderedPropsComponent = (...spreadComponentProps: Array<any>) => {
      const componentProps = mergeProps(allProps, ...spreadComponentProps)
      const result = context.render(component, context, componentProps)

      return <>{result}</>
    }

    if (!isRender) {
      return RenderedPropsComponent
    } else {
      return <RenderedPropsComponent />
    }
  })
}
