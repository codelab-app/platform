import { BaseMutationOptions } from '@apollo/client'
import { ElementTree } from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import {
  ElementFragment,
  useGetAtomsQuery,
  useGetComponentsQuery,
  useUpdateElementMutation,
} from '@codelab/shared/codegen/graphql'
import React, { useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import {
  updateElementSchema,
  UpdateElementSchemaType,
} from './updateElementSchema'

export type UpdateElementFormProps =
  UniFormUseCaseProps<UpdateElementSchemaType> & {
    element: ElementFragment
    tree: ElementTree
    refetchQueries?: BaseMutationOptions['refetchQueries']
  }

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  element,
  refetchQueries,
  tree,
  ...props
}: UpdateElementFormProps) => {
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: initialData } = useRef({
    atomId: element.atom?.id,
    name: element.name,
    componentId: tree.getComponentOfElement(element.id)?.id,
  })

  const { data: atoms } = useGetAtomsQuery()
  const { data: components } = useGetComponentsQuery()

  const [mutate, { loading: updating, error, data }] = useUpdateElementMutation(
    {
      awaitRefetchQueries: true,
      refetchQueries: refetchQueries,
    },
  )

  if (!initialData) {
    return null
  }

  const onSubmit = (submitData: UpdateElementSchemaType) => {
    return mutate({
      variables: {
        input: { elementId: element.id, updateData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<UpdateElementSchemaType>
        key={element.id}
        autosave={true}
        autosaveDelay={500}
        schema={updateElementSchema}
        model={{
          atomId: initialData.atomId,
          name: initialData.name,
          componentId: initialData.componentId,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['atomId', 'componentId']} />

        <SelectField
          name="atomId"
          label="Atom"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          options={atoms?.atoms.map((atom) => ({
            label: atom.name,
            value: atom.id,
          }))}
        />

        <SelectField
          name="componentId"
          label="Component"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          options={components?.getComponents.map((comp) => ({
            label: comp.name,
            value: comp.id,
          }))}
        />
      </FormUniforms>

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: updating,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
