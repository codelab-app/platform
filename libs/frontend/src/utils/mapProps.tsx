import * as R from 'ramda'
import React from 'react'

type PropsMapping = (props: any) => any

// TODO: remove any type
export const mapProps: any = R.curry(
  (mapping: PropsMapping, C: React.FunctionComponent) => R.compose(C, mapping),
)
