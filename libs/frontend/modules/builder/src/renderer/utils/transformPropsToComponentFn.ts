import { IElement, PropsData } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, merge, transform } from 'lodash'
import React from 'react'
import { RenderContext } from '../pipes'

type ComponentMap = {
  [key: string]: IElement
}

const getComponent = (value: any, tree: ElementTree) => {
  const { id } = value
  const component = id ? tree.getComponentById(id) : undefined

  if (!component) {
    console.warn('transformPropsToComponent', `Can't find component id : ${id}`)
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

    return context.render(component, context, componentProps)
  }

export const transformPropsToComponentFn = (
  props: PropsData,
  context: RenderContext,
  allProps: PropsData,
) => {
  const { tree } = context
  const propsComponents = mapPropsToComponents(props, tree)

  return mapValues(propsComponents, (value) => {
    return getRenderedComponentFn(
      value,
      context,
      allProps,
    ) as React.ComponentType<any>
  })
}
