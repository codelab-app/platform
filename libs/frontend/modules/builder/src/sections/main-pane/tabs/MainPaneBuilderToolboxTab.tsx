import { DragOutlined } from '@ant-design/icons'
import {
  AtomForSelectFragment,
  ComponentForSelectFragment,
  useGetAtomsForSelectQuery,
  useGetComponentsForSelectQuery,
} from '@codelab/frontend/modules/type'
import { ConditionalView } from '@codelab/frontend/view/components'
import { CreateElementInput } from '@codelab/shared/abstract/codegen'
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
      <ConditionalView
        condition={!atomsResponse.isLoading && !componentsResponse.isLoading}
        falseView={<Spin />}
      >
        {toolboxItems.map((item) => (
          <ToolboxItemView key={item.id} toolboxItem={item} />
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
