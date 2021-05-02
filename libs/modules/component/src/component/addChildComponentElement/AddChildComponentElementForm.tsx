import React, { useEffect } from 'react'
import {
  GetComponentDetailGql,
  useCreateComponentElementMutation,
  useGetAtomsListQuery,
} from '@codelab/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import {
  AddChildComponentElementInput,
  addChildComponentElementSchema,
} from './addChildComponentElementSchema'
import { SelectField } from 'uniforms-antd'

type AddChildComponentElementFormProps = UniFormUseCaseProps<AddChildComponentElementInput> & {
  parentComponentId: string
}

export const AddChildComponentElementForm = ({
  parentComponentId,
  ...props
}: AddChildComponentElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.ComponentElement)
  const [mutate, { loading: creating }] = useCreateComponentElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetComponentDetailGql,
        variables: {
          componentId: parentComponentId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: DeepPartial<AddChildComponentElementInput>) => {
    return mutate({
      variables: {
        input: {
          component_id: parentComponentId,
          ...submitData,
        },
      },
    })
  }

  const { data: atomsData } = useGetAtomsListQuery()
  const atomOptions = atomsData?.atom?.map((t) => ({
    value: t.id,
    label: t.type,
    type: t.type,
  }))

  return (
    <FormUniforms<AddChildComponentElementInput>
      schema={addChildComponentElementSchema}
      onSubmit={onSubmit}
      onSubmitSuccess={() => reset()}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component element',
      })}
      {...props}
    >
      {/* <AutoFields omitFields={['atom_id']} /> */}
      <SelectField
        value={parentComponentId}
        disabled
        name="parent_component_element_id"
        label="Parent ComponentElement ID"
      />
      <SelectField name="atom_id" label="Atom" options={atomOptions} />
    </FormUniforms>
  )
}
