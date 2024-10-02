import type { BuilderDragData } from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'

import { BuilderDndAction } from '@codelab/frontend/abstract/application'
import { MakeChildrenDraggable } from '@codelab/frontend-application-dnd/components'
import { ErrorBoundary } from '@codelab/frontend-presentation-view/components/errorBoundary'
import { Space } from 'antd'
import Input from 'antd/lib/input'
import { observer } from 'mobx-react-lite'
import { useRef, useState } from 'react'
import { debounce, filter, prop, sortBy } from 'remeda'

import { ComponentDragOverlay } from './ComponentDragOverlay'
import { ComponentItem } from './ComponentItem'

const { Search } = Input

export const ComponentList = observer<{
  components: Array<IAtomModel | IComponentModel>
  selectedIds?: Array<string>
  onDelete?(id: string): void
  onEdit?(id: string): void
  onExport?(component: IComponentModel): void
  onSelect?(id: string): void
}>(({ components, onDelete, onEdit, onExport, onSelect, selectedIds }) => {
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearch = useRef(
    debounce(
      (nextValue: string) => {
        setSearchValue(nextValue)
      },
      { waitMs: 200 },
    ),
  ).current

  const filteredItems = filter(components, (component) =>
    component.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
  )

  return (
    <>
      <Search
        allowClear
        key={1}
        onChange={(event) => debouncedSearch.call(event.target.value)}
        placeholder="Search component"
        style={{ marginBottom: 10 }}
      />
      <ErrorBoundary>
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          {sortBy(filteredItems, prop('name')).map((component) => (
            <MakeChildrenDraggable<BuilderDragData>
              customOverlay={<ComponentDragOverlay component={component} />}
              data={{
                action: BuilderDndAction.CreateElement,
                elementRenderType: {
                  __typename: component.__typename,
                  id: component.id,
                },
                name: component.name,
              }}
              id={component.id}
              key={component.id}
            >
              <ComponentItem
                component={component}
                key={component.id}
                onDelete={onDelete}
                onEdit={onEdit}
                onExport={onExport}
                onSelect={onSelect}
                selected={selectedIds?.includes(component.id)}
              />
            </MakeChildrenDraggable>
          ))}
        </Space>
      </ErrorBoundary>
    </>
  )
})
