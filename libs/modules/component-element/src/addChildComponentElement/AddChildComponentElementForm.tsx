import {
  refetchGetComponentDetailQuery,
  useCreateComponentLinkMutation,
  useGetAtomsListQuery,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'
import {
  AddChildComponentElementInput,
  addChildComponentElementSchema,
} from './addChildComponentElementSchema'

type AddChildComponentElementFormProps =
  UniFormUseCaseProps<AddChildComponentElementInput> & {
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
  const { reset, setLoading } = useCrudModalForm(
    EntityType.ChildComponentElement,
  )

  const [createComponentLink, { loading: creatingComponentLink }] =
    useCreateComponentLinkMutation({
      awaitRefetchQueries: true,
      refetchQueries: [refetchGetComponentDetailQuery({ componentId })],
    })

  useEffect(() => {
    setLoading(creatingComponentLink)
  }, [creatingComponentLink, setLoading])

  const onSubmit = (submitData: DeepPartial<AddChildComponentElementInput>) => {
    console.log(submitData)

    return createComponentLink({
      variables: {
        input: {
          component_id: submitData.component_id,
          source_component_element_id: submitData.parent_component_element_id,
          targetElement: {
            data: {
              component_id: submitData.component_id,
              atom_id: submitData.atom_id,
            },
          },
        },
      },
    })
  }

  const { data: atomsData } = useGetAtomsListQuery()

  const atomOptions = atomsData?.atom?.map((t) => ({
    value: t.id,
    label: t.type.label,
  }))

  return (
    <FormUniforms<AddChildComponentElementInput>
      id="add-childComponentElement-form"
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
