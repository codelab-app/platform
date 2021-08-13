import {
  CreateElementForm,
  CreateElementFormProps,
} from '@codelab/frontend/modules/element'
import { ComponentContext } from '@codelab/frontend/presenter/container'
import { refetchGetComponentElementsQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

export type CreateComponentElementFormProps = Omit<
  CreateElementFormProps,
  'parentElementOptions' | 'refetchQueries'
>

/**
 * Wrapper for {@link CreateElementForm} in the context of a Component
 */
export const CreateComponentElementForm = (
  props: CreateComponentElementFormProps,
) => {
  const { component, tree } = useContext(ComponentContext)

  const parentElementOptions = [
    ...tree.getAllElements().map((element) => ({
      label: element.name,
      value: element.id,
    })),
  ]

  const refetchQueries = [
    refetchGetComponentElementsQuery({ input: { componentId: component.id } }),
  ]

  return (
    <CreateElementForm
      parentElementOptions={parentElementOptions}
      refetchQueries={refetchQueries}
      {...props}
    />
  )
}

CreateComponentElementForm.displayName = 'CreateComponentElementForm'
