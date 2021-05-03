import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetPropTypeCListGql,
  useGetPropTypeCQuery,
  useUpdatePropTypeCMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import {
  UpdatePropTypeCInput,
  UpdatePropTypeCSchema,
} from './updatePropTypeCSchema'

type UpdatePropTypeCFormProps = UniFormUseCaseProps<UpdatePropTypeCInput>

export const UpdatePropTypeCForm = (props: UpdatePropTypeCFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.PropTypeC)
  const { updateId: updatePropTypeCId } = state

  const [mutate, { loading: updating }] = useUpdatePropTypeCMutation({
    refetchQueries: [
      {
        query: GetPropTypeCListGql,
        variables: {
          propTypeCId: updatePropTypeCId,
        },
      },
    ],
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
        input: {
          ...(submitData as any),
        },
        propTypeCId: updatePropTypeCId,
      },
    })
  }

  return (
    <FormUniforms<UpdatePropTypeCInput>
      onSubmit={onSubmit}
      schema={UpdatePropTypeCSchema}
      model={{ label: propTypeCItem?.label ?? '' }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
