import { reduce } from 'lodash'
import React from 'react'
import axios from 'axios'
import { notification, message } from 'antd'
import { isEvalPropValue, isRenderPropValue } from './Props.guards'
import { Props, PropValue, PropItem } from './Props.interface'

export const evalPropValue = (propValue: PropValue, ctx?: any): Function => {
  // eslint-disable-next-line no-new-func
  return new Function(propValue.value).call(ctx)
}

export const evalPropsFactory = (propValue: PropItem, ctx?: any) => {
  if (isEvalPropValue(propValue)) {
    return evalPropValue(propValue, ctx)
  }

  // if (isRenderPropValue(propValue)) {
  //   return
  // }

  // if (isReactNode) {
  //   return
  // }

  return propValue
}

export function evalProps<P extends Props = Props>(props: P, ctx?: any) {
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
    evalProps,
  }

  // Then pass the ctx into rest of props
  return {
    ...evalProps(restProps, {
      // We first take ctx from current props & eval that
      ...evalProps({ ctx }, libraryCtx).ctx,
      ...libraryCtx,
    }),
  }
}
