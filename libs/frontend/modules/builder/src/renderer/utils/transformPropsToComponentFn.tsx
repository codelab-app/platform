import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { mergeProps } from '@codelab/shared/utils'
import { mapValues, merge, transform } from 'lodash'
import React from 'react'
import { RenderProps } from '../../store'
import { RenderContext } from '../pipes'
import { RenderContainer } from '../renderContainer'

type ComponentMap = {
  [key: string]: IElement
}

const getComponent = (value: { id: string }, tree: ElementTree) => {
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

const mapPropsToComponents = (props: RenderProps, tree: ElementTree) => {
  const transformFn = createTransformFn(tree)
  const initialMap: ComponentMap = {}

  return transform(props, transformFn, initialMap)
}

const getRenderedComponentFn =
  (component: IElement, context: RenderContext, props: RenderProps) =>
  (spreadComponentProps: any) => {
    const componentProps = mergeProps(props, spreadComponentProps)

    return (
      <RenderContainer
        element={component}
        context={context}
        props={componentProps}
      />
    )
  }

export const transformPropsToComponentFn = (
  props: RenderProps,
  context: RenderContext,
  allProps: RenderProps,
) => {
  const { tree } = context
  const propsComponents = mapPropsToComponents(props, tree)

  return mapValues(propsComponents, (value) => {
    return getRenderedComponentFn(value, context, allProps)
  })
}
