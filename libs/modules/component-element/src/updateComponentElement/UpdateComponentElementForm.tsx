import {
  ComponentContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetComponentDetailQuery,
  useGetAtomsListQuery,
  useGetComponentElementQuery,
  useUpdateComponentElementMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useContext } from 'react'
import { DeepPartial } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import {
  UpdateComponentElementInput,
  updateComponentElementSchema,
} from './updateComponentElementSchema'

/** Not intended to be used in a modal */
export const UpdateComponentElementForm = (
  props: UniFormUseCaseProps<UpdateComponentElementInput>,
) => {
  const { reset, setLoading, state } = useCRUDModalForm(
    EntityType.ComponentElement,
  )

  const { component } = useContext(ComponentContext)

  const [mutate, { loading, error, data }] = useUpdateComponentElementMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetComponentDetailQuery({ componentId: component.id }),
    ],
  })

  const onSubmit = (submitData: DeepPartial<UpdateComponentElementInput>) => {
    return mutate({
      variables: {
        componentElementId: state.updateId,
        input: submitData,
      },
    })
  }

  const {
    data: componentElement,
    loading: loadingComponentElement,
  } = useGetComponentElementQuery({
    variables: {
      componentElementId: state.updateId,
    },
  })

  const { data: atomsData } = useGetAtomsListQuery()

  const atomOptions = atomsData?.atom?.map((t) => ({
    value: t.id,
    label: t.type.label,
    // type: t.type.id,
  }))

  if (loadingComponentElement) {
    return <Spin />
  }

  return (
    <FormUniforms<UpdateComponentElementInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={onSubmit}
      schema={updateComponentElementSchema}
      model={{ atom_id: componentElement?.component_element_by_pk?.atom.id }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField name="atom_id" options={atomOptions} />
    </FormUniforms>
  )
}
