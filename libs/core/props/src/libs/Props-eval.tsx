import { reduce } from 'lodash'
import React from 'react'
import axios from 'axios'
import { notification, message } from 'antd'
import { isTreeNode, isReactNode } from '@codelab/shared/interface/node'
import { PropValue, PropItem, Props } from '@codelab/shared/interface/props'
import { isEvalPropValue } from './Props.guards'
import { renderReactNodes } from './Props-react'

export const evalPropValue = (propValue: PropValue, ctx?: any): Function => {
  // eslint-disable-next-line no-new-func
  return new Function(propValue.value).call(ctx)
}

export const evalPropsFactory = (propValue: PropItem, ctx?: any) => {
  if (isEvalPropValue(propValue)) {
    return evalPropValue(propValue, ctx)
  }

  if (isReactNode(propValue) || isTreeNode(propValue)) {
    // We pass TreeDom via ctx to avoid circular depedency
    if (!ctx?.TreeDom) {
      throw new Error('TreeDom can not be found')
    }

    return renderReactNodes(propValue, ctx.TreeDom.render)
  }

  return propValue
}

/**
 * Goes through each object key/value pair, and apply the iteratee
 */
export function evalPropsIterator<P extends Props = Props>(
  props: P,
  ctx?: any,
) {
  return reduce<P, Props>(
    props,
    (evaluatedProp: Props, propValue: PropItem, propKey: keyof Props) => ({
      ...evaluatedProp,
      [propKey]: evalPropsFactory(propValue, ctx),
    }),
    {},
  )
}

/**
 * Allows us to build ctx & pass into props without needing a parent & child component
 */
export function evalPropsWithContext(props: Props): Props {
  const { ctx = {}, ...restProps } = props
  const libraryCtx = {
    React,
    axios,
    antd: { notification, message },
    props,
    evalProps: evalPropsIterator,
  }

  // Then pass the ctx into rest of props
  return {
    ...evalPropsIterator(restProps, {
      // We first take ctx from current props & eval that
      ...evalPropsIterator({ ctx }, libraryCtx).ctx,
      ...libraryCtx,
    }),
  }
}
