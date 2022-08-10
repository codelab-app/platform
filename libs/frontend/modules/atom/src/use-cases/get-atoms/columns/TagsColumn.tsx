import { Tag } from 'antd'
import { TagsColumnProps } from './types'

const GEEK_BLUE_COLOR = 'geekblue'

export const TagsColumn = ({ tags }: TagsColumnProps) => {
  return (
    <div>
      {tags?.map((tag: any) => {
        return (
          <Tag color={GEEK_BLUE_COLOR} key={tag?.id}>
            {tag?.name}
          </Tag>
        )
      })}
    </div>
  )
}
