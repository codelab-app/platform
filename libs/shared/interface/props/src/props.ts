import { CSSProperties } from 'react'

export type PropItem = any & Function & PropValue

// Only prop value of this type is evaluated
export interface PropValue {
  eval?: boolean // evaluate to function
  renderProps?: boolean | 'leaf' // Pass props to child
  value: string
}

// This is purely object shape, not concerning React props like PropTypes
export interface Props {
  ctx?: PropItem // Made available to current function props
  [name: string]: PropItem
}

export type PropsFromKeys<Keys extends string, P extends object = {}> = {
  [K in Keys]?: string | number | boolean | PropValue | P
} & { ctx?: PropItem; style?: CSSProperties }

// Accepted value from JSON representation
export type PropJsonValue = string | number | boolean
