import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetComponentDetailGql,
  useAddChildComponentElementMutation,
  useGetAtomsListQuery,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'
import {
  AddChildComponentElementInput,
  addChildComponentElementSchema,
} from './addChildComponentElementSchema'

type AddChildComponentElementFormProps = UniFormUseCaseProps<AddChildComponentElementInput> & {
  componentId: string
  parentComponentElementId?: string
}

/**
 *
 * @param componentId - The container Component that we're adding the ComponentElement to
 * @param parentComponentElementId - The parent ComponentElement
 *
 * @returns
 */
export const AddChildComponentElementForm = ({
  componentId,
  parentComponentElementId,
  ...props
}: AddChildComponentElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.ComponentElement)

  const [mutate, { loading: creating }] = useAddChildComponentElementMutation({
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

  const onSubmit = (submitData: DeepPartial<AddChildComponentElementInput>) => {
    return mutate({
      variables: {
        componentElement: {},
        componentLink: {},
        // input: {
        //   component_id: componentId,
        //   ...submitData,
        // },
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
      <AutoField
        value={componentId}
        name="component_id"
        label="Component ID"
        disabled
      />
      <SelectField
        value={parentComponentElementId}
        disabled
        name="parent_component_element_id"
        label="Parent ComponentElement ID"
      />
      <SelectField name="atom_id" label="Atom" options={atomOptions} />
    </FormUniforms>
  )
}
