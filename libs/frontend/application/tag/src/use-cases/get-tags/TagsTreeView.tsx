import type {
  ITagModel,
  ITagNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { type CheckedKeys, PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import type { TreeProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useTagService } from '../../services'
import { TagsTreeItem } from './TagsTreeItem'

interface TagsTreeViewProps {
  showSearchBar: boolean
}

export const TagsTreeView = observer(({ showSearchBar }: TagsTreeViewProps) => {
  const tagService = useTagService()
  const { routerService } = useApplicationStore()
  const { getDataFn, paginationService } = tagService
  const { tagDomainService } = useDomainStore()

  const { data, isLoading } = useTablePagination<ITagModel>({
    getDataFn,
    paginationService,
    // pathname: PageType.Tags(),
    pathname: PageType.Type(),
  })

  /**
   * Need to wait for all item to be hydrated first, before we can access children ref
   */
  const treeData: Array<ITreeNode<ITagNodeData>> = isLoading
    ? []
    : data
        .filter((tag) => tag.isRoot)
        .map((tag) => ({
          children: tag.children.map((child) => child.current.treeNode),
          extraData: {
            node: tag,
            type: 'tag',
          },
          key: tag.id,
          primaryTitle: tag.name,
          secondaryTitle: tag.name,
          title: `${tag.name}`,
        }))

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (selectedKeys[0]) {
      tagDomainService.setSelectedTag(tagRef(selectedKeys[0].toString()))
    }
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const { checked } = checkedKeys as CheckedKeys

    tagService.setCheckedTags(checked.map((check) => tagRef(check.toString())))
  }

  return (
    <CuiTree<ITreeNode<ITagNodeData>>
      checkStrictly
      checkable
      checkedKeys={tagService.checkedTags.map((checkedTag) => checkedTag.id)}
      expandedKeys={tagDomainService.expandedNodes}
      isLoading={isLoading}
      onCheck={onCheck}
      onExpand={(expandedKeys) => {
        tagDomainService.setExpandedNodes(
          expandedKeys.map((key) => key.toString()),
        )
      }}
      onSearchKeywordChange={(keyword) => {
        routerService.setQueryParams({ search: keyword })
      }}
      onSelect={onSelect}
      searcheable={
        showSearchBar
          ? {
              primaryTitle: true,
            }
          : false
      }
      titleRender={(node) => {
        return <TagsTreeItem data={node} />
      }}
      treeData={treeData}
    />
  )
})
