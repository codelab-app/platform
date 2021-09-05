import {
  MoveElementForm,
  MoveElementFormProps,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { ComponentContext } from '../../../providers/ComponentProvider'
import { refetchGetComponentElementsQuery } from '../../get-component-elements'

type MoveComponentElementFormProps = Omit<
  MoveElementFormProps,
  'initialData' | 'parentElementOptions' | 'refetchQueries' | 'tree'
>

/**
 * Wrapper for {@link MoveElementForm} in the context of a Component
 */
export const MoveComponentElementForm = ({
  elementId,
  ...props
}: MoveComponentElementFormProps) => {
  const { component, tree } = useContext(ComponentContext)

  return (
    <SelectElementProvider tree={tree}>
      <MoveElementForm
        tree={tree}
        refetchQueries={[
          refetchGetComponentElementsQuery({
            input: { componentId: component.id },
          }),
        ]}
        elementId={elementId}
        {...props}
      />
    </SelectElementProvider>
  )
}

MoveComponentElementForm.displayName = 'MoveComponentElementForm'
