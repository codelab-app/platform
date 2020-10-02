import { pickBy } from 'lodash'
import { anyPass, compose, curry } from 'ramda'
import React, { FunctionComponent } from 'react'
import { propsIterator } from '../builder/Props-iterator'
import { isRenderProp } from '../guards/Props-guards'
import { PropItem, Props, PropsFactory } from '@codelab/shared/interface/props'

export type PropFilterPredicate = (
  allowedKeys: Array<string>,
  value: Props[keyof Props],
  key: keyof Props,
) => boolean

export const isValidKey = curry<PropFilterPredicate>(
  (allowedKeys, value, key) => {
    return [...allowedKeys, 'children'].includes(key as any)
  },
)

export const propsFilter = curry((allowedKeys: Array<string>, props: Props) => {
  return pickBy(props, anyPass([isValidKey(allowedKeys) as any]))
})

export type PropsFilter<P> = (props: P) => P

export const withFilters = (
  filterFn: (props: Props) => Props,
  Component: FunctionComponent<Props>,
): FunctionComponent<Props> => {
  return compose((props: Props) => <Component {...props} />, filterFn)
}
