import { DragOutlined } from '@ant-design/icons'
import { CreateElementInput } from '@codelab/frontend/abstract/codegen'
import {
  AtomForSelectFragment,
  ComponentForSelectFragment,
  useGetAtomsForSelectQuery,
  useGetComponentsForSelectQuery,
} from '@codelab/frontend/modules/type'
import { ConditionalView } from '@codelab/frontend/view/components'
import { useDroppable } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { Button } from 'antd'
import Spin from 'antd/lib/spin'
import React from 'react'
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

const atomToolboxItemFactory = (atom: AtomForSelectFragment): ToolboxItem => ({
  name: atom.name,
  id: atom.id,
  createElementInputFactory: () => ({
    name: atom.name,
    atom: {
      atomId: atom.id,
    },
  }),
})

const componentToolboxItemFactory = (
  component: ComponentForSelectFragment,
): ToolboxItem => {
  const name = component.name ?? component.componentTag?.name ?? '' // componentTag should be defined, the '?? ""' is for type safety

  return {
    name,
    id: component.id,
    createElementInputFactory: () => ({
      name,
      instanceOfComponentId: component.id,
    }),
  }
}

export interface MainPaneBuilderToolboxTabProps {
  searchQuery?: string
}

export const MainPaneBuilderToolboxTab = ({
  searchQuery,
}: MainPaneBuilderToolboxTabProps) => {
  const atomsResponse = useGetAtomsForSelectQuery(
    searchQuery ? { variables: { input: { where: { searchQuery } } } } : {},
  )

  const { setNodeRef } = useDroppable({
    id: BuilderDropId.Toolbox,
  })

  const componentsResponse = useGetComponentsForSelectQuery(
    searchQuery
      ? {
          variables: { input: { searchQuery } },
        }
      : {},
  )

  const toolboxItems: Array<ToolboxItem> = [
    ...(atomsResponse?.data?.getAtoms?.map(atomToolboxItemFactory) ?? []),
    ...(componentsResponse?.data?.getComponents?.map(
      componentToolboxItemFactory,
    ) ?? []),
  ]

  return (
    <div
      ref={setNodeRef}
      css={css`
        max-height: 100%;
        height: 100%;
        overflow-y: hidden;
        display: grid;
        grid-auto-rows: auto;
        gap: 0.25rem;
      `}
    >
      <ConditionalView
        condition={!atomsResponse.isLoading && !componentsResponse.isLoading}
        falseView={<Spin />}
      >
        {toolboxItems.map((item) => (
          <ToolboxItemView toolboxItem={item} key={item.id} />
        ))}
      </ConditionalView>
    </div>
  )
}

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
        {...listeners}
        {...attributes}
        size="small"
        icon={<DragOutlined />}
      />
    </div>
  )
}

MainPaneBuilderToolboxTab.displayName = 'MainPaneBuilderToolboxTab'
