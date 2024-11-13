import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { PageType } from '@codelab/frontend/abstract/types'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { useAtomService } from '../../services'
import { AtomsTreeItem } from './AtomsTreeItem'

interface AtomsTreeViewProps {
  data: Array<IAtomModel>
  isLoading: boolean
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ data, isLoading, showSearchBar }: AtomsTreeViewProps) => {
    const { routerService } = useApplicationStore()
    const [selectedNode, setSelectedNode] = useState(routerService.node)

    const treeData: Array<ITreeNode<IAtomTreeNodeData>> = data.map((atom) => ({
      children: atom.api.current.fieldsTree,
      extraData: { node: atom, type: 'atom' },
      key: atom.id,
      primaryTitle: atom.library.name,
      secondaryTitle: atom.name,
    }))

    return (
      <div className="size-full">
        <CuiTree<ITreeNode<IAtomTreeNodeData>>
          isLoading={isLoading}
          onSearchKeywordChange={(keyword) => {
            routerService.setQueryParams({
              ...routerService.queryParams,
              search: keyword,
            })
          }}
          /**
           * Push the selected node id to url state
           */
          onSelect={(selectedKeys) => {
            const selectedKey = selectedKeys[0]

            if (selectedKey) {
              setSelectedNode(selectedKey.toString())

              const params = new URLSearchParams(window.location.search)

              params.set('node', selectedKey.toString())
              window.history.replaceState({}, '', `?${params.toString()}`)
            }
          }}
          searchKeyword={routerService.search}
          searcheable={showSearchBar ? { primaryTitle: true } : false}
          selectedKeys={selectedNode ? [selectedNode] : []}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        />
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
