import { reduce } from 'lodash'
import React from 'react'
import axios from 'axios'
import { notification, message } from 'antd'
import { isEvalPropValue } from './Props.guards'
import { Props, PropValue } from './Props.interface'

export const evalPropValue = (propValue: PropValue, ctx?: any): Function => {
  // eslint-disable-next-line no-new-func
  return new Function(propValue.value).call(ctx)
}

export function evalProps<P extends Props = Props>(props: P, ctx?: any) {
  return reduce<P, Props>(
    props,
    (
      evaluatedProp: Props,
      propValue: Props[keyof Props],
      propKey: keyof Props,
    ) => ({
      ...evaluatedProp,
      [propKey]: isEvalPropValue(propValue)
        ? evalPropValue(propValue, ctx)
        : propValue,
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

  if (!ctx) {
    return {
      ...evalProps(restProps, libraryCtx),
    }
  }

  // We first take ctx from current props & eval that
  const { ctx: context } = evalProps({ ctx }, libraryCtx)

  // Then pass the ctx into rest of props
  return {
    ...evalProps(restProps, { ...context, ...libraryCtx }),
  }
}
