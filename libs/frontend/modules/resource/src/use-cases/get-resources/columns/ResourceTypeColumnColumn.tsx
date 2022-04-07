import { AtomType } from '@codelab/shared/abstract/core'
import { Tag } from 'antd'

const colorByType: Record<string, string> = {
  [AtomType.ResourceGraphQL]: 'geekblue',
  [AtomType.ResourceREST]: 'orange',
}

type ResourceTypeColumnProp = { type: AtomType }

export const ResourceTypeColumnColumn = ({ type }: ResourceTypeColumnProp) => (
  <Tag color={colorByType[type]} key={type}>
    {type}
  </Tag>
)
