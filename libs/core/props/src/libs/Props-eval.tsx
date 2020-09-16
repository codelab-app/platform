import { message, notification } from 'antd'
import axios from 'axios'
import { reduce, omit } from 'lodash'
import React from 'react'
import {
  isReactNode,
  isReactNodeArray,
  isTreeNode,
} from '@codelab/shared/interface/node'
import {
  PropValue,
  PropItem,
  Props,
  PropsFactory,
  PropsIterator,
  PropsBuilder,
} from '@codelab/shared/interface/props'
import { isEvalPropValue } from './Props.guards'
import { renderReactNodes } from './Props-react'

export const evalPropValue = (propValue: PropValue, ctx?: any): Function => {
  // eslint-disable-next-line no-new-func
  return new Function(propValue.value).call(ctx)
}

export const evalPropsFactory: PropsFactory = (
  acc: Props,
  propValue: PropItem,
  propKey: keyof Props,
): Props => {
  if (isEvalPropValue(propValue)) {
    return { ...acc, [propKey]: evalPropValue(propValue, acc.ctx) }
  }

  if (
    isReactNode(propValue) ||
    isTreeNode(propValue) ||
    isReactNodeArray(propValue)
  ) {
    // We pass TreeDom via ctx to avoid circular depedency
    if (!acc.ctx?.TreeDom) {
      throw new Error('TreeDom can not be found')
    }

    return {
      ...acc,
      [propKey]: renderReactNodes(propValue, acc.ctx.TreeDom.render),
    }
  }

  return { ...acc, [propKey]: propValue }
}

/**
 * Goes through each object key/value pair, and apply the iteratee
 */
export const evalPropsIterator: PropsIterator = <P extends Props = Props>(
  props: P,
  iteratee: PropsFactory,
  ctx?: any,
) => {
  return reduce<P, Props>(
    props,
    (evaluatedProp: Props, propValue: PropItem, propKey: keyof Props) => {
      return iteratee(evaluatedProp, propValue, propKey)
    },
    ctx ? { ctx } : {},
  )
}

/**
 * Allows us to build ctx & pass into props without needing a parent & child component
 */
export const evalPropsWithContext: PropsBuilder = (
  currentI: Props,
  parentI: Props,
): Props => {
  const { ctx: currentCtx, ...restCurrentProps } = currentI
  const { ctx: parentCtx } = parentI
  const libraryCtx = {
    React,
    axios,
    antd: { notification, message },
    props: currentI,
    evalProps: evalPropsIterator,
    evalPropsFactory,
  }

  const ctx = {
    ...evalPropsIterator(
      { ctx: { ...parentCtx, ...currentCtx } },
      evalPropsFactory,
      libraryCtx,
    ).ctx,
    ...libraryCtx,
  }

  const currentA = evalPropsIterator(restCurrentProps, evalPropsFactory, ctx)

  return omit(currentA, 'ctx')
}
