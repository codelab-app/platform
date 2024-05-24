import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type { ITagNodeData, ITreeNode } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TagsTreeItemProps {
  data: ITreeNode<ITagNodeData>
}

export const TagsTreeItem = observer(({ data }: TagsTreeItemProps) => {
  const { tagService } = useStore()

  return (
    <CuiTreeItem
      onClick={() => {
        tagService.updateForm.open(tagRef(data.extraData.node))
      }}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={[
            {
              cuiKey: MODEL_ACTION.DeleteTag.key,
              icon: <DeleteOutlined />,
              label: 'Delete',
              onClick: () => {
                tagService.deleteManyModal.open([tagRef(data.extraData.node)])
              },
              title: 'Delete',
            },
          ]}
          title="Tags item toolbar"
        />
      }
    />
  )
})
