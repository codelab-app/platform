import { refetchGetComponentElementsQuery } from '@codelab/codegen/graphql'
import { MoveElementForm, MoveElementFormProps } from '@codelab/modules/element'
import React, { useContext } from 'react'
import { ComponentContext } from '../../providers'

type MoveComponentElementFormProps = Omit<
  MoveElementFormProps,
  'initialData' | 'parentElementOptions' | 'refetchQueries'
>

/**
 * Wrapper for {@link MoveElementForm} in the context of a Component
 */
export const MoveComponentElementForm = ({
  elementId,
  ...props
}: MoveComponentElementFormProps) => {
  const { tree, component } = useContext(ComponentContext)

  const parentElementOptions = [
    ...tree.getAllElements().map((e) => ({
      label: e.name,
      value: e.id,
    })),
  ]

  const order = tree.getOrderInParent(elementId)
  const parent = tree.getParent(elementId)

  return (
    <MoveElementForm
      initialData={{
        parentElementId: parent?.id as string,
        order,
      }}
      parentElementOptions={parentElementOptions}
      refetchQueries={[
        refetchGetComponentElementsQuery({
          input: { componentId: component.id },
        }),
      ]}
      elementId={elementId}
      {...props}
    />
  )
}

MoveComponentElementForm.displayName = 'MoveComponentElementForm'
