import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetLibrariesGql,
  useCreateComponentElementMutation,
  useCreateComponentLinkMutation,
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
  parentComponentElementId: string
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
  const { reset, setLoading } = useCRUDModalForm(
    EntityType.ChildComponentElement,
  )

  const [
    createComponentElement,
    { loading: creatingComponentElement },
  ] = useCreateComponentElementMutation()

  const [
    createComponentLink,
    { loading: creatingComponentLink },
  ] = useCreateComponentLinkMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetLibrariesGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creatingComponentLink)
  }, [creatingComponentLink, setLoading])

  const onSubmit = (submitData: DeepPartial<AddChildComponentElementInput>) => {
    console.log(submitData)

    return createComponentElement({
      variables: {
        input: {
          component_id: submitData.component_id,
          atom_id: submitData.atom_id,
        },
      },
    }).then((res) => {
      console.log(res)

      return createComponentLink({
        variables: {
          input: {
            component_id: submitData.component_id,
            source_component_element_id: submitData.parent_component_element_id,
            target_component_element_id:
              res.data?.insert_component_element_one?.id,
          },
        },
      })
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
      id="add-child-component-element-form"
      schema={addChildComponentElementSchema}
      onSubmit={onSubmit}
      onSubmitSuccess={() => reset()}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component element',
      })}
      {...props}
    >
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
