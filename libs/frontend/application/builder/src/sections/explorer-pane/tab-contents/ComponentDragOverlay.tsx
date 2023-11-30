import type {
  IAtomModel,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import React from 'react'
import { ComponentIcon } from './ComponentIcon'

interface ComponentDragOverlayProps {
  component: IAtomModel | IComponentModel
}

export const ComponentDragOverlay = ({
  component,
}: ComponentDragOverlayProps) => {
  return (
    <div className="w-16 scale-100 rounded-md  bg-white p-4 shadow-lg">
      <ComponentIcon component={component} />
    </div>
  )
}
