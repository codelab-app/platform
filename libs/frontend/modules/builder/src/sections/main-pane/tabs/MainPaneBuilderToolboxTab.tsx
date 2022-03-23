import { DragOutlined } from '@ant-design/icons'
import { AtomService } from '@codelab/frontend/modules/atom'
// import { useGetComponentsQuery } from '@codelab/frontend/modules/component'
import { CreateElementInput } from '@codelab/frontend/modules/element'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { IAtom, IComponent } from '@codelab/shared/abstract/core'
import { useDroppable } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { BuilderDropId } from '../../../dnd/BuilderDropId'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

export interface ToolboxItem {
  id: string
  name: string
  createElementInputFactory: () => Omit<
    CreateElementInput,
    'parentElementId' | 'order'
  >
}

const atomToolboxItemFactory = (atom: IAtom): ToolboxItem => ({
  name: atom.name,
  id: atom.id,
  createElementInputFactory: () => ({
    name: atom.name,
    atom: {
      atomId: atom.id,
    },
  }),
})

const componentToolboxItemFactory = (component: IComponent): ToolboxItem => {
  const { name, id } = component

  return {
    name,
    id,
    createElementInputFactory: () => ({
      name,
      componentId: id,
    }),
  }
}

export interface MainPaneBuilderToolboxTabProps {
  searchQuery?: string
  atomStore: AtomService
}

export const MainPaneBuilderToolboxTab = observer(
  ({ searchQuery, atomStore }: MainPaneBuilderToolboxTabProps) => {
    const { setNodeRef } = useDroppable({ id: BuilderDropId.Toolbox })

    const [getAtoms, { isLoading: isLoadingAtoms }] = useLoadingState(() =>
      atomStore.getAll(),
    )

    const atomsList = atomStore.atomsList

    useEffect(() => {
      getAtoms()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const search = searchQuery
      ? { variables: { where: { name_CONTAINS: searchQuery } } }
      : {}

    // const componentsResponse = useGetComponentsQuery(search)
    // const components = componentsResponse.data?.components || []

    const toolboxItems: Array<ToolboxItem> = [
      ...atomsList.map(atomToolboxItemFactory),
      // ...components.map(componentToolboxItemFactory),
    ]

    return (
      <div
        css={css`
          max-height: 100%;
          height: 100%;
          overflow-y: hidden;
          display: grid;
          grid-auto-rows: auto;
          gap: 0.25rem;
        `}
        ref={setNodeRef}
      >
        <SpinnerWrapper
          isLoading={false}
          // isLoading={isLoadingAtoms || componentsResponse.isLoading}
        >
          {toolboxItems.map((item) => (
            <ToolboxItemView key={item.id} toolboxItem={item} />
          ))}
        </SpinnerWrapper>
      </div>
    )
  },
)

const ToolboxItemView = ({ toolboxItem }: { toolboxItem: ToolboxItem }) => {
  const { attributes, listeners, setNodeRef } = useCreateElementDraggable(
    toolboxItem.id,
    toolboxItem.createElementInputFactory(),
  )

  return (
    <div css={tw`border-gray-300 p-2 border flex items-center justify-between`}>
      <span>{toolboxItem.name}</span>

      <Button
        ref={setNodeRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listeners}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        icon={<DragOutlined />}
        size="small"
      />
    </div>
  )
}

MainPaneBuilderToolboxTab.displayName = 'MainPaneBuilderToolboxTab'
