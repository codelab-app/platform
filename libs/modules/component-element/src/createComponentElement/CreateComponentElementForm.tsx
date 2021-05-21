import {
  EntityType,
  PropsWithIds,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetComponentDetailQuery,
  useCreateComponentElementMutation,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { CreateComponentElementFormBase } from './CreateComponentElementFormBase'
import { CreateComponentElementInput } from './createComponentElementSchema'

type CreateComponentElementFormProps =
  UniFormUseCaseProps<CreateComponentElementInput> & PropsWithIds<'componentId'>

/**
 * This is used to create the first ComponentElement, which is added as a child vertex to the Component
 *
 * The ComponentLink will be inferred from the source (parent) & target (newly created node).
 *
 * @param {string} componentId - The parent id of the Component that we're adding the child ComponentElement under
 *
 * @returns
 */
export const CreateComponentElementForm = ({
  componentId,
  ...props
}: CreateComponentElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.ComponentElement)

  const [mutate, { loading: creating }] = useCreateComponentElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetComponentDetailQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: DeepPartial<CreateComponentElementInput>) => {
    console.log(submitData, componentId)

    return mutate({
      variables: {
        input: {
          component_id: componentId,
          atom_id: submitData.atom_id,
        },
      },
    })
  }

  return (
    <CreateComponentElementFormBase
      onSubmit={onSubmit}
      onSubmitSuccess={() => reset()}
      {...props}
    />
  )
}
