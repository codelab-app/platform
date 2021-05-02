import React, { useEffect } from 'react'
import { CreateComponentElementInput } from './createComponentElementSchema'
import {
  GetComponentDetailGql,
  useCreateComponentElementMutation,
} from '@codelab/hasura'
import {
  EntityType,
  PropsWithIds,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import { CreateComponentElementFormBase } from './CreateComponentElementFormBase'

type CreateComponentElementFormProps = UniFormUseCaseProps<CreateComponentElementInput> &
  PropsWithIds<'componentId'>

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
    refetchQueries: [
      {
        query: GetComponentDetailGql,
        variables: {
          componentId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: DeepPartial<CreateComponentElementInput>) => {
    return mutate({
      variables: {
        input: {
          component_id: componentId,
          ...submitData,
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
