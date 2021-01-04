/* eslint-disable no-underscore-dangle */
import { Form, message, notification } from 'antd'
import axios from 'axios'
import { pipe } from 'ramda'
import React from 'react'
import { propsFactoryEval, propsFactoryReact } from '../factories'
import { propsFilterRenderProps } from '../filters'
import { isEvalProp } from '../guards'
import { propsMapGetter } from '../mapper/Props-map--getter'
import { propsRemoveSingle } from '../mapper/Props-remove--single'
import {
  PropTypeValue,
  Props,
  PropsBuilder,
} from '@codelab/alpha/shared/interface/props'

/**
 * @param value The prop value we are evaluating
 * @param renderProps All these props are assumed to be renderProps
 */
export const evalPropValue = (
  value: PropTypeValue,
  renderProps: Props = {},
): any => {
  if (isEvalProp(value) && typeof value.value === 'string') {
    /**
     * Bind only renderProps from parent, all props are already evaluated
     */
    const props = pipe(propsMapGetter)(renderProps)

    // eslint-disable-next-line no-new-func
    return new Function(value.value).call({
      React,
      axios,
      antd: { notification, message, Form },
      ...props,
    })
  }

  return value
}

/**
 * This function will strip the meta information by removing `__type`. Only use this function as the last function in the chain before binding to component.
 *
 * @param current Current props to be evaluated
 * @param parent Only renderProps are merged with current props
 */
export const transformProps: PropsBuilder = (
  current: Props,
  parent: Props = {},
): Props => {
  /**
   * Prepare the `ctx` for children. We need to select only renderProps to pass down, also we will need to `eval` it so it is ready to be used.
   */
  const renderProps = pipe(
    propsFilterRenderProps,
    propsFactoryEval({}),
    propsFactoryReact,
    propsMapGetter,
  )(parent)

  /*
   * Evaluated children props, with renderProps as context for eval. Combine render props with children props.
   */
  return {
    ...pipe(
      propsFactoryEval(renderProps),
      propsFactoryReact,
      propsMapGetter,
    )(current),
    /**
     * Strip out single render props so it only passes one level
     */
    ...propsRemoveSingle(parent),
  }
}
