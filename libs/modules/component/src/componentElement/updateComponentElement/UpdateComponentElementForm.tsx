import { refetchGetComponentElementsQuery } from '@codelab/codegen/graphql'
import { ComponentContext } from '@codelab/frontend/shared'
import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/modules/element'
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
