import type { IBuilderComponent } from '@codelab/frontend/abstract/core'
import {
  BuilderDndType,
  IRenderTypeKind,
} from '@codelab/frontend/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { Card } from 'antd'
import Tooltip from 'antd/lib/tooltip'
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
  component: Pick<IBuilderComponent, 'icon' | 'name'>
}

export const antDesignIconPrefix = 'assets/atoms/antd'

export const GetComponentItem = ({ component }: GetComponentItemProps) => {
  const title = (
    <Tooltip placement="left" title={component.name}>
      <b css={tw`text-sm`}>{component.name}</b>
    </Tooltip>
  )

  const src = component.icon
    ? `/${antDesignIconPrefix}/${component.icon}.svg`
    : '/codelab-logo-default.svg'

  return (
    <Card hoverable title={title}>
      <img alt="" css={tw`w-full`} src={src} />
    </Card>
  )
}
