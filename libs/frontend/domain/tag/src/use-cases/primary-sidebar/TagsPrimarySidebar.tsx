import { CuiSidebar } from '@codelab/frontend/presentation//codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  return (
    <CuiSidebar
      label="Tags"
      views={[
        {
          content: <TagsTreeView />,
          key: 'tags',
          label: 'Tags',
        },
      ]}
    />
  )
})
