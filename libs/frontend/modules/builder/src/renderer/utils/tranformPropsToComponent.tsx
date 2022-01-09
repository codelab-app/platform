import { mergeProps } from '@codelab/shared/utils'
import * as _ from 'lodash'
import React from 'react'
import { RenderContext } from '../pipes'
import { RenderContainer } from '../renderContainer'
import { containerKey } from './containerKey'

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

      const result = (
        <RenderContainer key={containerKey(component)}>
          {context.render(component, context, componentProps)}
        </RenderContainer>
      )

      return <>{result}</>
    }

    if (!isRender) {
      return RenderedPropsComponent
    } else {
      return <RenderedPropsComponent />
    }
  })
}
