import React, { useEffect } from 'react'
import { CreateComponentElementInput } from './createComponentElementSchema'
import {
  GetComponentDetailGql,
  useCreateComponentElementMutation,
} from '@codelab/hasura'
import { useContext } from 'react'
import {
  ComponentContext,
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import { CreateComponentElementFormBase } from './CreateComponentElementFormBase'

type CreateComponentElementFormProps = UniFormUseCaseProps<CreateComponentElementInput>

export const CreateComponentElementForm = ({
  ...props
}: CreateComponentElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.ComponentElement)
  const { componentId } = useContext(ComponentContext)

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
