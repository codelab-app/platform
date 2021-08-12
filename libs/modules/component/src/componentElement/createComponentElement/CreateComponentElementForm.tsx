import { refetchGetComponentElementsQuery } from '@codelab/codegen/graphql'
import { ComponentContext } from '@codelab/frontend/shared'
import {
  CreateElementForm,
  CreateElementFormProps,
} from '@codelab/modules/element'
import React, { useContext } from 'react'

type CreateComponentElementFormProps = Omit<
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
