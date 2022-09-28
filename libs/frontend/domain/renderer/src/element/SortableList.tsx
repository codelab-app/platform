import { IElement } from '@codelab/frontend/abstract/core'
import { SortableContext } from '@dnd-kit/sortable'
import React from 'react'
import { SortableItem } from './SortableItem'

export interface SortableListProps {
  element: IElement
  children: Array<React.ReactElement>
}

export const SortableList = (props: SortableListProps) => {
  return (
    <div style={{ border: '4px solid blue' }}>
      <SortableContext
        items={props.element.children.map((element) => element.id)}
        //   strategy={rectSwappingStrategy}
      >
        {props.children.map((element, index) => {
          return (
            <SortableItem
              children={element}
              element={props.element.children[index]}
              key={index}
            />
          )
        })}
      </SortableContext>
    </div>
  )
}
