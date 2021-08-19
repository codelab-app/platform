import {
  MoveElementForm,
  MoveElementFormProps,
} from '@codelab/frontend/modules/element'
import { ComponentContext } from '@codelab/frontend/presenter/container'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

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
  const { component, tree } = useContext(ComponentContext)

  const parentElementOptions = [
    ...tree.getAllNodes().map((e) => ({
      label: e.name || e.atom.type,
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
