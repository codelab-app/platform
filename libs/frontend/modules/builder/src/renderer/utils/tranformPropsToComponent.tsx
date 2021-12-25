import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues } from 'lodash'
import React from 'react'
import { RenderProps } from '../../store'
import { RenderContext } from '../pipes'
import { RenderContainer } from '../renderContainer'
import { containerKey } from './containerKey'

const getComponent = (value: RenderProps, tree: ElementTree) => {
  const { id } = value
  const component = id ? tree.getComponentById(id) : undefined

  if (!component) {
    console.warn('transformPropsToComponent', `Cant find component id ${id}`)

    return undefined
  }

  return component
}

const getRenderedPropsComponent = (
  allProps: RenderProps,
  component: IElement,
  context: RenderContext,
) => {
  return (...spreadComponentProps: Array<any>) => {
    const componentProps = mergeProps(allProps, ...spreadComponentProps)
    console.log(context)

    return (
      <RenderContainer
        context={context}
      >
        {context.render(component,context,componentProps)}
        </RenderContainer>
      
    )
  }
}

export const transformPropsToComponent = (
  props: Record<string, any>,
  context: RenderContext,
  isRender = false,
  allProps: Record<string, any>,
) => {
  return mapValues(props, (value) => {
    const { tree } = context
    const component = getComponent(value, tree)

    if (!component) {
      return undefined
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
    }

    return <RenderedPropsComponent />
  })
}
