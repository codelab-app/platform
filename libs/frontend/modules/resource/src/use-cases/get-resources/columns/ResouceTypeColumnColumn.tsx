import { AtomType } from '@codelab/shared/abstract/core'
import { Tag } from 'antd'

const colorByType: Record<string, string> = {
  [AtomType.ResourceGraphQL]: 'geekblue',
  [AtomType.ResourceQuery]: 'orange'
}

export const ResouceTypeColumnColumn = ({ type }: { type: AtomType }) => {
  const color = colorByType[type]
  console.log(
    'ResouceTypeColumnColumn',
    {
      color,
      type
    }
  );


  return (
    <Tag color={color} key={type}>
      {type}
    </Tag>
  )
}
