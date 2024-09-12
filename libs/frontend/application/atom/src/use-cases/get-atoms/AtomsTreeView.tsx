import type {
  IAtomModel,
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useAtomService } from '../../services'

interface AtomsTreeViewProps {
  showSearchBar: boolean
}

export const AtomsTreeView = observer(
  ({ showSearchBar }: AtomsTreeViewProps) => {
    const { getDataFn, paginationService } = useAtomService()
    const { routerService } = useApplicationStore()

    const { data, isLoading } = useTablePagination<IAtomModel>({
      getDataFn,
      paginationService,
      pathname: PageType.Atoms(),
    })

    const treeData: Array<ITreeNode<IAtomTreeNodeData>> = data.map((atom) => ({
      children: atom.api.current.fieldsTree,
      extraData: { node: atom, type: 'atom' },
      key: atom.id,
      primaryTitle: atom.library.name,
      secondaryTitle: atom.name,
    }))

    return (
      <div className="size-full">
        {/* <CuiTree<ITreeNode<IAtomTreeNodeData>>
          isLoading={isLoading}
          onSearchKeywordChange={(keyword) =>
            routerService.setQueryParams({ search: keyword })
          }
          searchKeyword={routerService.search}
          searcheable={showSearchBar ? { primaryTitle: true } : false}
          titleRender={(node) => <AtomsTreeItem data={node} />}
          treeData={treeData}
        /> */}
      </div>
    )
  },
)

AtomsTreeView.displayName = 'AtomsTreeView'
