import { TAG_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { CheckedKeys } from '@codelab/frontend/abstract/types'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { Tree, TreeProps } from 'antd'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { tagRef } from '../../store'

export const GetTagsTree = observer<WithServices<TAG_SERVICE>>(
  ({ tagService }) => {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
      tagService.setSelectedTag(tagRef(selectedKeys[0] as string))
    }

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
      const { checked } = checkedKeys as CheckedKeys

      tagService.setCheckedTags(checked.map((check) => tagRef(check as string)))
    }

    const [_, { isLoading }] = useStatefulExecutor(
      () => tagService.getTagGraphs(),
      { executeOnMount: true },
    )

    return (
      <Spinner isLoading={isLoading}>
        <Tree
          checkStrictly
          checkable
          checkedKeys={tagService.checkedTags.map(
            (checkedTag) => checkedTag.id,
          )}
          disabled={isLoading}
          onCheck={onCheck}
          onSelect={onSelect}
          treeData={toJS(tagService.antdTreeDataNode)}
        />
      </Spinner>
    )
  },
)
