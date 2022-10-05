import { PropFragment } from './prop.fragment.graphql.gen'

export type IPropDTO = PropFragment

export type IUpdatePropDTO = Pick<IPropDTO, 'data'>
