import type { IBuilderComponent } from '@codelab/frontend/abstract/core'
import {
  BuilderDndType,
  IRenderTypeKind,
} from '@codelab/frontend/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
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
      name: compoundCaseToTitleCase(component.name),
      renderType: {
        id: component.id,
        kind: IRenderTypeKind.Atom,
      },
    }
  }, [component])

  const { attributes, listeners, setNodeRef } = useCreateElementDraggable({
    component,
    createElementInput,
    id: component.id,
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
      css={tw`mb-2 cursor-pointer [max-width: 48%]`}
    >
      <GetComponentItem component={component} />
    </div>
  )
}

interface GetComponentItemProps {
  className?: string
  component: Pick<IBuilderComponent, 'icon' | 'name'>
}

export const antDesignIconPrefix = 'assets/atoms/antd'

export const GetComponentItem = ({
  className = '',
  component,
}: GetComponentItemProps) => (
  <Card
    className={className}
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
