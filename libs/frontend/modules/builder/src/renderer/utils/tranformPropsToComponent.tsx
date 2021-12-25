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
    console.warn('transformPropsToComponent', `Cant find component id : ${id}`)

    return undefined
  }

  return component
}

const getRenderedComponent =
  (component: IElement, context: RenderContext, props: RenderProps) =>
  (...spreadComponentProps: Array<any>) => {
    const componentProps = mergeProps(props, ...spreadComponentProps)

    return (
      <RenderContainer
        key={containerKey(component)}
        context={context}
      >
        {context.render(component,context,componentProps)}
        </RenderContainer>
      
    )
  }

export const transformPropsToComponent = (
  props: RenderProps,
  context: RenderContext,
  isRender = false,
  allProps: RenderProps,
) => {
  return mapValues(props, (value) => {
    const { tree } = context
    const component = getComponent(value, tree)

    if (!component) {
      return undefined
    }

    const RenderedComponent = getRenderedComponent(component, context, allProps)

    if (!isRender) {
      return RenderedComponent
    }

    return <RenderedComponent />
  })
}
