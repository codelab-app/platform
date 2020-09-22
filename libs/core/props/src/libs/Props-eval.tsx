import { message, notification } from 'antd'
import axios from 'axios'
import React from 'react'
import { propsIterator } from './Props-iterator'
import { renderReactNodes } from './Props-react'
import {
  leafRenderPropsFilter,
  singleRenderPropsFilter,
} from './Props-renderProps'
import { isEvalPropValue, isRenderPropValue } from './Props.guards'
// eslint-disable-next-line import/no-cycle
import { TreeDom } from '@codelab/core/renderer'
import {
  isReactNode,
  isReactNodeArray,
  isTreeNode,
} from '@codelab/shared/interface/node'
import {
  PropItem,
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
  propValue: PropItem,
  propKey: keyof Props,
): Props => {
  if (isEvalPropValue(propValue)) {
    return {
      ...acc,
      [propKey]: isRenderPropValue(propValue)
        ? {
            renderProps: propValue.renderProps,
            value: evalPropValue(propValue, acc.ctx ?? {}),
          }
        : evalPropValue(propValue, acc.ctx ?? {}),
    }
  }

  if (
    isReactNode(propValue) ||
    isTreeNode(propValue) ||
    isReactNodeArray(propValue)
  ) {
    return {
      ...acc,
      [propKey]: renderReactNodes(propValue, TreeDom.render),
    }
  }

  return { ...acc, [propKey]: propValue }
}

/**
 * Allows us to build ctx & pass into props without needing a parent & child component
 */
export const buildProps: PropsBuilder = (
  currentI: Props,
  parentI: Props,
): Props => {
  const renderProps = singleRenderPropsFilter(parentI)
  const leafRenderProps = leafRenderPropsFilter(parentI)
  const externalProps = leafRenderPropsFilter(currentI)

  const mergedProps = {
    ...renderProps,
    ...leafRenderProps,
    ...externalProps,
    ...currentI,
  }

  return {
    ...propsIterator(
      {
        ctx: {
          props: { ...mergedProps },
        },
        ...mergedProps,
      },
      evalPropsFactory,
    ),
  }
}

export const buildCtx = (props: any) => {
  const { ctx = {} } = props
  const libraryCtx = {
    React,
    axios,
    antd: { notification, message },
    props,
    evalProps: propsIterator,
    evalPropsFactory,
  }

  return {
    ...propsIterator(
      { ctx: { ...libraryCtx }, providerCtx: { ...ctx } },
      evalPropsFactory,
    ).providerCtx,
    ...libraryCtx,
  }
}
