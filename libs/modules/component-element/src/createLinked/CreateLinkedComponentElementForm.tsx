import React, { useEffect } from 'react'
import { GetComponentDetailGql } from '@codelab/hasura'
import { useContext } from 'react'
import {
  ComponentContext,
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import { useCreateComponentLinkMutation } from '@codelab/hasura'
import { CreateComponentElementFormBase } from '../create/CreateComponentElementFormBase'
import { CreateComponentElementInput } from '../create/createComponentElementSchema'

type CreateLinkedComponentElementFormProps = UniFormUseCaseProps<CreateComponentElementInput> & {
  sourceComponentElementId: string
}

/**
 * Same as CreateComponentElementForm, but links the new element to an existing source element
 */
export const CreateLinkedComponentElementForm = ({
  sourceComponentElementId,
  ...props
}: CreateLinkedComponentElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.ComponentElement)
  const { componentId } = useContext(ComponentContext)

  const [mutate, { loading: creating }] = useCreateComponentLinkMutation({
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
          source_element_id: sourceComponentElementId,
          targetElement: {
            data: {
              component_id: componentId,
              ...submitData,
            },
          },
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
