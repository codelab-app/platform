import { BaseMutationOptions } from '@apollo/client'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementTreeGraphql } from '../../tree'
import { useGetElementQuery } from '../get-element'
import { useUpdateElementMutation } from './UpdateElement.api.graphql'
import { UpdateElementSchema, updateElementSchema } from './updateElementSchema'

export type UpdateElementFormProps =
  UniFormUseCaseProps<UpdateElementSchema> & {
    elementId: string
    tree: ElementTreeGraphql
    refetchQueries?: BaseMutationOptions['refetchQueries']
  }

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  elementId,
  refetchQueries,
  tree,
  ...props
}: UpdateElementFormProps) => {
  const { data: getElementData } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
  })

  const element = getElementData?.getElement

  const [mutate, { loading: updating, error, data }] = useUpdateElementMutation(
    {
      awaitRefetchQueries: true,
      refetchQueries: refetchQueries,
    },
  )

  if (!element) {
    return null
  }

  const onSubmit = (submitData: UpdateElementSchema) => {
    return mutate({
      variables: {
        input: { id: element.id, data: { ...submitData } },
      },
    })
  }

  const componentId = tree.getComponentOfElement(elementId)?.id

  return (
    <div css={tw`relative`}>
      <FormUniforms<UpdateElementSchema>
        key={element.id}
        autosave={true}
        autosaveDelay={500}
        schema={updateElementSchema}
        model={{
          atomId: element.atom?.id,
          name: element.name,
          componentId,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['atomId', 'componentId']} />

        <AutoField name="atomId" component={SelectAtom} />
        <AutoField name="componentId" component={SelectComponent} />
      </FormUniforms>

      <div css={tw`absolute top-0 right-0 m-8`}>
        <StatelessLoadingIndicator
          style={{ display: 'block', margin: '0.5rem' }}
          state={{
            isLoading: updating,
            isErrored: Boolean(
              error || (data as any)?.errors || (data as any)?.error,
            ),
          }}
        />
      </div>
    </div>
  )
}
