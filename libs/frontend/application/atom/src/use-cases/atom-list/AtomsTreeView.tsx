import type {
  IPaginationSearchParams,
  ITreeViewProps,
} from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { AtomsTreeItem } from './AtomsTreeItem'

export const AtomsTreeView = observer<ITreeViewProps<IAtomModel>>(
  ({ data, isLoading, searchParams, showSearchBar }) => {
    const { search, selectedKey } = searchParams

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
          filter={
            showSearchBar
              ? {
                  filterable: { primaryTitle: true },
                  keyword: search || '',
                }
              : undefined
          }
          isLoading={isLoading}
          selectedKeys={selectedKey ? [selectedKey] : []}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        />
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
