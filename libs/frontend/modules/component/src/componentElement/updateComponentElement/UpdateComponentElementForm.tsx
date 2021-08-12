import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/frontend/modules/element'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

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
