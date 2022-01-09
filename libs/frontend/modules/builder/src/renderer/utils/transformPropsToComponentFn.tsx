import { IElement, PropsData } from '@codelab/shared/abstract/core'
import { Entity } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, merge, transform } from 'lodash'
import React from 'react'
import { RenderContext } from '../pipes'
import { RenderContainer } from '../renderContainer'
import { containerKey } from './containerKey'

type ComponentMap = {
  [key: string]: IElement
}

const getComponent = (value: Entity, tree: ElementTree) => {
  const { id } = value
  const component = id ? tree.getComponentById(id) : undefined

  if (!component) {
    console.warn('transformPropsToComponent', `Cant find component id : ${id}`)
  }

  return component
}

const createTransformFn = (tree: ElementTree) => {
  return (result: ComponentMap, value: any, key: string): ComponentMap => {
    const component = getComponent(value, tree)

    return component ? merge(result, { [key]: component }) : result
  }
}

const mapPropsToComponents = (props: PropsData, tree: ElementTree) => {
  const transformFn = createTransformFn(tree)
  const initialMap: ComponentMap = {}

  return transform(props, transformFn, initialMap)
}

const getRenderedComponentFn =
  (component: IElement, context: RenderContext, props: PropsData) =>
  (spreadComponentProps: any) => {
    const componentProps = mergeProps(props, spreadComponentProps)

    return (
      <RenderContainer key={containerKey(component)} context={context}>
        {context.render(component, context, componentProps)}
      </RenderContainer>
    )
  }

export const transformPropsToComponentFn = (
  props: PropsData,
  context: RenderContext,
  allProps: PropsData,
) => {
  const { tree } = context
  const propsComponents = mapPropsToComponents(props, tree)

  return mapValues(propsComponents, (value) => {
    return getRenderedComponentFn(value, context, allProps)
  })
}
