import { WithAtomService } from '@codelab/frontend/modules/atom'
import { CreateElementButton } from '@codelab/frontend/modules/element'
import { EqualityConditionalView } from '@codelab/frontend/view/components'
import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import { Nullable } from '@codelab/shared/abstract/types'
import Input from 'antd/lib/input'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { BuilderTab } from '../../store/BuilderTab'

const { Search } = Input

const paneTitles: Record<BuilderTab, string> = {
  [BuilderTab.Toolbox]: 'Toolbox',
  [BuilderTab.Tree]: 'Element Tree',
}

const headerFactory = (
  tab: BuilderTab,
  root: Nullable<Element>,
  onSearch: (input: string) => void,
  elementService: ElementService,
  builderService: BuilderService,
) => {
  // if (tab === BuilderTab.Tree && root) {
  //   return <CreateElementButton key={0} parentElementId={root.id} />
  // }

  if (tab === BuilderTab.Toolbox) {
    return (
      <Search
        allowClear
        key={1}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search toolbox"
      />
    )
  }

  return undefined
}

export type MainPaneBuilderProps = WithAtomService &
  WithBuilderService &
  WithElementService &
  WithComponentService

export const MainPaneBuilder = observer<MainPaneBuilderProps>(
  ({ isComponentBuilder, atomService }) => {
    const { builderTab } = useBuilderTab()
    // const { elementTree } = useElementGraphContext()
    const { selectedElement, resetSelection } = useBuilderSelectedElement()

    // const root = isComponentBuilder
    //   ? elementTree.getRootComponent()
    //   : elementTree.getRootElement()

    // const [searchValue, setSearchValue] = useState('')
    //
    // const debouncedSearch = useCallback(
    //   (_v: string) =>
    //     debounce((nextValue: string) => setSearchValue(nextValue), 200)(_v),
    //   [],
    // )

    const root = elementService.elementTree?.root

    return (
      <MainPaneTemplate
        containerProps={{ onClick: () => resetSelection() }}
        // header={headerFactory(builderTab, root, debouncedSearch)}
        // key={root?.id ?? 'main-pane-builder'}
        title={paneTitles[builderTab]}
      >
        <EqualityConditionalView
          expectedValue={BuilderTab.Tree}
          value={builderTab}
        >
          {/* <MainPaneBuilderTreeTab*/}
          {/*  isComponentBuilder={isComponentBuilder}*/}
          {/*   rootId={root?.id as string}*/}
          {/*/ >*/}
        </EqualityConditionalView>

        <EqualityConditionalView
          expectedValue={BuilderTab.Toolbox}
          value={builderTab}
        >
          {/* <MainPaneBuilderToolboxTab*/}
          {/*  atomStore={atomService}*/}
          {/*  searchQuery={searchValue}*/}
          {/*/ >*/}
        </EqualityConditionalView>

        {/* <CreateElementModal parentElementId={selectedElement?.id} />*/}
        {/* <DeleteElementModal />*/}
      </MainPaneTemplate>
    )
  },
)
