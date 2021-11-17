import { Tag } from 'antd'
import { LibraryColumnProps } from './types'

const DEFAUT_LIBRARY = 'Ant Design'
const GEEK_BLUE_COLOR = 'geekblue'
const ORANGE_COLOR = 'orange'

export const LibraryColumn = ({
  library = DEFAUT_LIBRARY,
}: LibraryColumnProps) => {
  const color = library === DEFAUT_LIBRARY ? GEEK_BLUE_COLOR : ORANGE_COLOR

  return (
    <Tag color={color} key={library}>
      {library}
    </Tag>
  )
}
