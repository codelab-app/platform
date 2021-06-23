import {
  Prop_Type_Constraint,
  Prop_Type_Update_Column,
  PropTypeCollection__PropTypeFragment,
  refetchGetPropTypeCListQuery,
  useGetPropTypeCQuery,
  useUpsertPropTypeCMutation,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields, HiddenField } from 'uniforms-antd'
import {
  UpdatePropTypeCInput,
  updatePropTypeCSchema,
} from './updatePropTypeCSchema'

type UpdatePropTypeCFormProps = UniFormUseCaseProps<UpdatePropTypeCInput>

const cleanPropTypesFromExtraMeta = (
  propTypes: Array<PropTypeCollection__PropTypeFragment>,
) =>
  (
    propTypes as Array<
      PropTypeCollection__PropTypeFragment & {
        __typename: string
      }
    >
  ).map(({ __typename, type, prop_type_c_id, ...cleanedItem }) => cleanedItem)

export const UpdatePropTypeCForm = (props: UpdatePropTypeCFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.PropTypeC)
  const { updateId: updatePropTypeCId } = state

  const [mutate, { loading: updating }] = useUpsertPropTypeCMutation({
    refetchQueries: [refetchGetPropTypeCListQuery()],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetPropTypeCQuery({
    variables: {
      propTypeCId: updatePropTypeCId,
    },
  })

  const propTypeCItem = data?.prop_type_c_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdatePropTypeCInput>) => {
    return mutate({
      variables: {
        object: {
          id: submitData?.id,
          label: submitData?.label,
          library_id: submitData?.library_id,
          ...(submitData?.propTypes && {
            propTypes: {
              data: submitData.propTypes as UpdatePropTypeCInput['propTypes'],
              on_conflict: {
                constraint: Prop_Type_Constraint.PropTypePkey,
                update_columns: [
                  Prop_Type_Update_Column.IsArray,
                  Prop_Type_Update_Column.ValueType,
                  Prop_Type_Update_Column.Key,
                ],
              },
            },
          }),
        },
      },
    })
  }

  return (
    <FormUniforms<UpdatePropTypeCInput>
      onSubmit={onSubmit}
      schema={updatePropTypeCSchema}
      model={{
        id: propTypeCItem?.id,
        label: propTypeCItem?.label ?? '',
        library_id: propTypeCItem?.library_id,
        propTypes: propTypeCItem?.propTypes
          ? cleanPropTypesFromExtraMeta(propTypeCItem.propTypes)
          : [],
      }}
      onSubmitError={createNotificationHandler({})}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields fields={['label', 'propTypes']} />
      <HiddenField name="id" />
      <HiddenField name="library_id" />
    </FormUniforms>
  )
}
