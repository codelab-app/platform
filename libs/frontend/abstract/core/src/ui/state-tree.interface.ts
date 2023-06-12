import type { IField } from '../domain'

export interface StateTreeDataNode {
  children?: Array<StateTreeDataNode>
  field: IField
  key: number | string
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
}
