import { Attributes, ComponentClass, FunctionComponent } from 'react'
import { PropsFilter } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

export type ElementParameters<P extends Props> = [
  FunctionComponent<P> | ComponentClass<P> | string,
  Attributes & P,
  PropsFilter<P>?,
]
