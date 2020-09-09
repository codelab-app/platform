import { pickBy } from 'lodash'
import { anyPass, compose, curry } from 'ramda'
import React, { FunctionComponent } from 'react'
import { Props } from '@codelab/shared/interface'

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

export function withFilters(
  filterFn: (props: Props) => Props,
  Component: FunctionComponent<Props>,
): FunctionComponent<Props> {
  return compose((props: Props) => <Component {...props} />, filterFn)
}
