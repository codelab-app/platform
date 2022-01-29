import { Tag } from 'antd'
import { TagsColumnProps } from './types'

const GEEK_BLUE_COLOR = 'geekblue'

export const TagsColumn = ({ tags, tagData }: TagsColumnProps) => {
  return (
    <div>
      {tags.map((tagId) => (
        <Tag color={GEEK_BLUE_COLOR} key={tagId}>
          {tagData.find((tag) => tag.id === tagId)?.name || ''}
        </Tag>
      ))}
    </div>
  )
}
