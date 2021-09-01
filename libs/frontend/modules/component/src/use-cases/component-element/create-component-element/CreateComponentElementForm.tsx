import {
  CreateElementForm,
  CreateElementFormProps,
  ElementFragment,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { ComponentContext } from '../../../providers/ComponentProvider'
import { refetchGetComponentElementsQuery } from '../../get-component-elements'

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
    ...(
      tree.getAllVertices(tree.isElementPredicate) as Array<ElementFragment>
    ).map((element) => ({
      label: element.name || element.atom?.type,
      value: element.id,
    })),
  ]

  const refetchQueries = [
    refetchGetComponentElementsQuery({ input: { componentId: component.id } }),
  ]

  return (
    <SelectElementProvider tree={tree}>
      <CreateElementForm refetchQueries={refetchQueries} {...props} />
    </SelectElementProvider>
  )
}

CreateComponentElementForm.displayName = 'CreateComponentElementForm'
