import type {
  IBuilderComponent,
  IFieldDefaultValue,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { BuilderDndType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createSlug } from '@codelab/frontend/shared/utils'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import { antDesignIconPrefix } from '@codelab/shared/data'
import { Card } from 'antd'
import { isNil } from 'ramda'
import React, { useMemo } from 'react'
import tw from 'twin.macro'
import { useCreateElementDraggable } from '../../../dnd/useCreateElementDraggable'

interface DraggableGetComponentItemProps {
  component: IBuilderComponent
}

/**
 * generates a JSON containing api fields that has a default value
 * that will be saved as props for the new element created
 */
const makeDefaultProps = (typeApi: Maybe<IInterfaceType>) => {
  const fields = typeApi?.fields ?? []

  const defaultProps = fields.reduce<
    Record<string, Nullish<IFieldDefaultValue>>
  >((acc, field) => {
    if (!isNil(field.defaultValues)) {
      acc[field.key] = field.defaultValues
    }

    return acc
  }, {})

  return JSON.stringify(defaultProps)
}

export const DraggableGetComponentItem = ({
  component,
}: DraggableGetComponentItemProps) => {
  const { typeService } = useStore()

  const createElementInput = useMemo(() => {
    // Atoms are interface type
    // by the time this is called, it should be already available because of the query GetRenderedPageAndCommonAppData
    const typeApi = typeService.type(component.api.id) as Maybe<IInterfaceType>

    return {
      name: component.name,
      atomId: component.id,
      slug: createSlug(component.name),
      propsData: makeDefaultProps(typeApi),
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
