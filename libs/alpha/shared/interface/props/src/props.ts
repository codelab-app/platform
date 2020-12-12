import { CSSProperties, ReactNode, ReactNodeArray } from 'react'
import { PropType } from './props-enum'
import { NodeReactI } from '@codelab/alpha/shared/interface/node'

export type PropJsonValue = string | number | boolean

export interface PropTypeValue {
  __type: Array<PropType>
  value: PropJsonValue | Function
}

export type PropItem =
  | PropTypeValue
  | PropJsonValue
  | CSSProperties
  | undefined
  // React
  | NodeReactI
  | Array<NodeReactI>
  | ReactNode
  | ReactNodeArray

type OtherProps = {
  ctx?: PropTypeValue
  style?: CSSProperties
}

// This is purely object shape, not concerning React props like PropTypes
export type Props = {
  [name: string]: PropItem
} & OtherProps

export type PropsFromKeys<Keys extends string, P extends object = {}> = {
  [K in Keys]?: PropItem
} &
  OtherProps

/**
 * Same as iteratee
 */
export type PropsIteratee = (
  acc: Props,
  propValue: PropItem,
  propKey: keyof Props,
) => Props

/**
 * Return same props, converting the subtype of props the factory is responsible for
 */
export type PropsFactory = (props: Props) => Props

export type PropsIterator = (props: Props, iteratee: PropsIteratee) => Props

// export type PropsIteratee = (
//   props: Props,
//   value: PropItem,
//   key: keyof Props,
// ) => Props

export type PropsBuilder = (current: Props, parent?: Props) => Props
