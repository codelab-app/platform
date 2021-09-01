import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/frontend/modules/element'
import React, { useContext } from 'react'
import { ComponentContext } from '../../../providers/ComponentProvider'
import { refetchGetComponentElementsQuery } from '../../get-component-elements'

export type UpdateComponentElementFormProps = Omit<
  UpdateElementFormProps,
  'refetchQueries'
>

/**
 * Wrapper for {@link UpdateElementForm} in the context of a Component
 */
export const UpdateComponentElementForm = (
  props: UpdateComponentElementFormProps,
) => {
  const { component } = useContext(ComponentContext)

  const refetchQueries = [
    refetchGetComponentElementsQuery({ input: { componentId: component.id } }),
  ]

  return <UpdateElementForm refetchQueries={refetchQueries} {...props} />
}

UpdateComponentElementForm.displayName = 'UpdateComponentElementForm'
