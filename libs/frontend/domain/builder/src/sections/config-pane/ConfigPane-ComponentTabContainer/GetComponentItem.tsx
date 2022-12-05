import {
  BuilderDndType,
  IBuilderComponent,
} from '@codelab/frontend/abstract/core'
import { antDesignIconPrefix } from '@codelab/shared/data'
import { Card } from 'antd'
import React, { useMemo } from 'react'
import tw from 'twin.macro'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

interface DraggableGetComponentItemProps {
  component: IBuilderComponent
}

export const DraggableGetComponentItem = ({
  component,
}: DraggableGetComponentItemProps) => {
  const createElementInput = useMemo(() => {
    return {
      name: component.name,
      atomId: component.id,
    }
  }, [component])

  const { attributes, listeners, setNodeRef } = useCreateElementDraggable({
    id: component.id,
    createElementInput,
    component,
    overlayRenderer: () => (
      <GetComponentItem component={component} tw="opacity-40" />
    ),
    type: BuilderDndType.CreateElement,
  })

  return (
    <div
      ref={setNodeRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      css={tw`mb-6 cursor-pointer`}
    >
      <GetComponentItem component={component} />
    </div>
  )
}

interface GetComponentItemProps {
  component: Pick<IBuilderComponent, 'icon' | 'name'>
  className?: string
}

export const GetComponentItem = ({
  component,
  className = '',
}: GetComponentItemProps) => (
  <Card
    className={className}
    css={tw`mr-16`}
    hoverable
    title={<b css={tw`text-sm`}>{component.name}</b>}
  >
    <img
      alt=""
      css={tw`w-full`}
      src={
        component.icon
          ? `/${antDesignIconPrefix}/${component.icon}.svg`
          : '/codelab-logo-default.svg'
      }
    />
  </Card>
)
