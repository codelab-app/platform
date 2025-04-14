import type {
  IAtomCreateRoute,
  ITreeViewProps,
} from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { mergeDeep } from 'remeda'

import { AtomsTreeItem } from './AtomsTreeItem'

type AtomsTreeViewProps = ITreeViewProps<IAtomModel> & {
  context: IAtomCreateRoute
}

export const AtomsTreeView = observer<AtomsTreeViewProps>(
  ({
    context,
    data,
    handlePaginationChange,
    isLoading,
    searchParams,
    showSearchBar,
  }) => {
    const { pageSize, search, selectedKey } = searchParams

    const treeData: Array<ITreeNode<IAtomTreeNodeData>> = data.map((atom) => ({
      // May not be hydrated yet after adding, need to make sure our hydration strategy hydrates the entire aggregate at once
      children: atom.api.current.fieldsTree,
      extraData: { node: atom, type: 'atom' },
      key: atom.id,
      primaryTitle: atom.library.name,
      secondaryTitle: atom.name,
    }))

    return (
      <div className="size-full">
        <CuiTree<ITreeNode<IAtomTreeNodeData>>
          defaultSelectedKeys={selectedKey ? [selectedKey] : []}
          filter={
            showSearchBar
              ? {
                  filterable: { primaryTitle: true },
                  keyword: search || '',
                }
              : undefined
          }
          isLoading={isLoading}
          onSearchKeywordChange={(newSearch) =>
            handlePaginationChange?.(1, pageSize, newSearch)
          }
          titleRender={(node) => (
            <AtomsTreeItem
              context={mergeDeep(context, {
                params: {
                  atomId: node.extraData.node.id,
                },
              })}
              data={node}
            />
          )}
          treeData={treeData}
        />
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
