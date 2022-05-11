import { DragOutlined } from '@ant-design/icons'
import {
  ATOM_SERVICE,
  COMPONENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import {
  IAtom,
  IComponent,
  ICreateElementDTO,
} from '@codelab/shared/abstract/core'
import { useDroppable } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { Button } from 'antd'
import Fuse from 'fuse.js'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { BuilderDropId } from '../../../dnd/BuilderDropId'
import { ToolboxItem } from './ToolboxItem'

export interface ToolboxItemProps {
  id: string
  name: string
  createElementInputFactory: () => Omit<
    ICreateElementDTO,
    'parentElementId' | 'order' | 'owner'
  >
}

const atomToolboxItemFactory = (atom: IAtom): ToolboxItemProps => ({
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
  component: IComponent,
): ToolboxItemProps => {
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

export type ToolboxProps = WithServices<ATOM_SERVICE | COMPONENT_SERVICE> & {
  searchQuery?: string
}

export const Toolbox = observer<ToolboxProps>(
  ({ searchQuery, atomService, componentService }) => {
    const { setNodeRef } = useDroppable({ id: BuilderDropId.Toolbox })

    const [filteredItems, setFilteredItems] = useState<Array<ToolboxItemProps>>(
      [],
    )

    const fuseRef = useRef(new Fuse<ToolboxItemProps>([], { keys: ['name'] }))

    const [, { isLoading: isLoadingAtoms }] = useStatefulExecutor(
      () => atomService.getAll(),
      { executeOnMount: true },
    )

    const [, { isLoading: isLoadingComponents }] = useStatefulExecutor(
      () => componentService.getAll(),
      { executeOnMount: true },
    )

    useEffect(() => {
      return autorun(() => {
        const componentsList = componentService.components
        const atomsList = atomService.atoms

        const toolboxItems: Array<ToolboxItemProps> = [
          ...atomsList.map(atomToolboxItemFactory),
          ...[...componentsList.values()].map(componentToolboxItemFactory),
        ]

        fuseRef.current.setCollection(toolboxItems)

        if (searchQuery) {
          const results = fuseRef.current.search(searchQuery)
          setFilteredItems(results.map((r) => r.item))
        } else {
          setFilteredItems(toolboxItems)
        }
      })
    }, [searchQuery])

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
        <Spinner isLoading={isLoadingAtoms || isLoadingComponents}>
          {filteredItems.map((item) => (
            <ToolboxItem key={item.id} toolboxItem={item} />
          ))}
        </Spinner>
      </div>
    )
  },
)

Toolbox.displayName = 'MainPaneBuilderToolboxTab'
