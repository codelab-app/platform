import { Form, message, notification } from 'antd'
import axios from 'axios'
import React from 'react'
import { propsIterator } from './Props-iterator'
import { renderReactNodes } from './Props-react'
import {
  leafRenderPropsFilter,
  singleRenderPropsFilter,
} from './Props-renderProps'
import { isEvalPropValue, isRenderPropValue } from './Props.guards'
import {
  isReactNode,
  isReactNodeArray,
  isTreeNode,
} from '@codelab/shared/interface/node'
import {
  PropValue,
  Props,
  PropsBuilder,
  PropsFactory,
} from '@codelab/shared/interface/props'

export const evalPropValue = (propValue: PropValue, ctx?: any): Function => {
  // eslint-disable-next-line no-new-func
  return new Function(propValue.value).call(ctx)
}

export const evalPropsFactory: PropsFactory = (
  acc: Props,
  propValue: Props[keyof Props],
  propKey: keyof Props,
): Props => {
  if (isEvalPropValue(propValue) && propKey !== 'ctx') {
    if (propKey === 'evalCtx') {
      return {
        ...acc,
        [propKey]: isRenderPropValue(propValue)
          ? {
              ...propValue,
              ...evalPropValue(propValue, acc.ctx ?? {}),
            }
          : evalPropValue(propValue, acc.ctx ?? {}),
      }
    }

    return {
      ...acc,
      [propKey]: isRenderPropValue(propValue)
        ? {
            ...propValue,
            value: evalPropValue(propValue, acc.ctx ?? {}),
          }
        : evalPropValue(propValue, acc.ctx ?? {}),
    }
  }

  if (
    isReactNode(propValue) ||
    isTreeNode(propValue) ||
    (isReactNodeArray(propValue) && propKey !== 'ctx')
  ) {
    return {
      ...acc,
      [propKey]: renderReactNodes(propValue),
    }
  }

  return { ...acc, [propKey]: propValue }
}

/**
 * Allows us to simplify renderProps so that we can access renderProps without "value" propperty
 */
export const simplifyRenderPropsFactory: PropsFactory = (
  acc: Props,
  propValue: Props[keyof Props],
  propKey: keyof Props,
) => {
  if (isRenderPropValue(propValue))
    return { ...acc, [propKey]: propValue.value }

  return { ...acc, [propKey]: propValue }
}

/**
 * Allows us to build ctx & pass into props without needing a parent & child component
 */
export const buildProps: PropsBuilder = (
  currentI: Props,
  renderProps: Props,
): Props => {
  const { ctx = {}, ...restProps } = currentI

  const leafRenderProps = {
    ...leafRenderPropsFilter(renderProps),
    ...leafRenderPropsFilter(restProps),
  }

  const singleRenderProps = {
    ...singleRenderPropsFilter(renderProps),
    ...singleRenderPropsFilter(restProps),
  }

  const evaluatedCtx = {
    ...ctx,
    props: {
      ...restProps,
      ...propsIterator(
        { ...leafRenderProps, ...singleRenderProps },
        simplifyRenderPropsFactory,
      ),
    },
  }

  // Then pass the ctx into rest of props
  return {
    ...leafRenderProps,
    ...propsIterator(restProps, evalPropsFactory, {
      ctx: evaluatedCtx,
    }),
  }
}

export const buildCtx = (props: Props) => {
  const libraryCtx = {
    React,
    axios,
    antd: { notification, message, Form },
    props,
    evalProps: propsIterator,
    evalPropsFactory,
  }

  const { ctx = {} } = props

  return {
    ...propsIterator({ evalCtx: ctx }, evalPropsFactory, {
      ctx: libraryCtx,
    }).evalCtx,
    ...libraryCtx,
  }
}
