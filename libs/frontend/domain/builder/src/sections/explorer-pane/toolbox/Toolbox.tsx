import {
  IAtom,
  IAtomService,
  IComponent,
  IComponentService,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import { useDroppable } from '@dnd-kit/core'
import { css } from '@emotion/react'
import Fuse from 'fuse.js'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { useAsync } from 'react-use'
import { BuilderDropId } from '../../../dnd/BuilderDropId'
import { ToolboxItem, ToolboxItemProps } from './ToolboxItem'

const atomToolboxItemFactory = (atom: IAtom): ToolboxItemProps => ({
  name: atom.name,
  id: atom.id,
  createElementInputFactory: () => ({
    name: atom.name,
    slug: createSlug(atom.name),
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
      slug: createSlug(name),
    }),
  }
}

export interface ToolboxProps {
  searchQuery?: string
  atomService: IAtomService
  componentService: IComponentService
}

export const Toolbox = observer<ToolboxProps>(
  ({ searchQuery, atomService, componentService }) => {
    const { setNodeRef } = useDroppable({ id: BuilderDropId.Toolbox })

    const [filteredItems, setFilteredItems] = useState<Array<ToolboxItemProps>>(
      [],
    )

    const fuseRef = useRef(new Fuse<ToolboxItemProps>([], { keys: ['name'] }))
    const { loading: isLoadingAtoms } = useAsync(() => atomService.getAll(), [])

    const { loading: isLoadingComponents } = useAsync(
      () => componentService.getAll(),
      [],
    )

    useEffect(() => {
      return autorun(() => {
        const componentsList = componentService.components

        const toolboxItems: Array<ToolboxItemProps> = [
          ...atomService.atomsList.map(atomToolboxItemFactory),
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
