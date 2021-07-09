import {
  __TypeFragment,
  refetchGetTypesQuery,
  useUpdateEnumTypeMutation,
  useUpdateSimpleTypeMutation,
  useUpdateTypeMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useCallback, useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeKind } from '../../shared'
import { UpdateTypeSchema, updateTypeSchema } from './updateTypeSchema'

const typenameToKind = (typename: string) => {
  switch (typename) {
    case 'Interface':
      return TypeKind.Interface
    case 'SimpleType':
      return TypeKind.Simple
    case 'ArrayType':
      return TypeKind.Array
    case 'EnumType':
      return TypeKind.Enum
  }

  throw new Error("Can't recognize typename of type")
}

export const UpdateTypeForm = (
  props: UniFormUseCaseProps<UpdateTypeSchema>,
) => {
  const { setLoading, state, reset } = useCrudModalForm(EntityType.Type)
  const mutationOptions = { refetchQueries: [refetchGetTypesQuery()] }

  const [mutateSimple, simpleMutationData] =
    useUpdateSimpleTypeMutation(mutationOptions)

  const [mutateEnum, enumMutationData] =
    useUpdateEnumTypeMutation(mutationOptions)

  const [mutateType, typeMutationData] = useUpdateTypeMutation(mutationOptions)

  useEffect(() => {
    const loading =
      simpleMutationData.loading ||
      enumMutationData.loading ||
      typeMutationData.loading

    setLoading(loading)
  }, [
    simpleMutationData.loading,
    enumMutationData.loading,
    typeMutationData.loading,
    setLoading,
  ])

  const handleSubmit = useCallback(
    (submitData: UpdateTypeSchema) => {
      const kind = typenameToKind(state?.metadata?.__typename)

      switch (kind) {
        case TypeKind.Simple:
          if (!submitData.primitiveType) {
            throw new Error('Primitive type not set')
          }

          return mutateSimple({
            variables: {
              input: {
                typeId: state.updateId,
                updateData: {
                  name: submitData.name,
                  primitiveType: submitData.primitiveType,
                },
              },
            },
          })
        case TypeKind.Enum:
          if (!submitData.allowedValues) {
            throw new Error('Allowed values not set')
          }

          return mutateEnum({
            variables: {
              input: {
                typeId: state.updateId,
                updateData: {
                  name: submitData.name,
                  allowedValues: submitData.allowedValues.map((av) => ({
                    value: av.value,
                    name: av.name || undefined,
                  })),
                },
              },
            },
          })
        default:
          return mutateType({
            variables: {
              input: {
                typeId: state.updateId,
                updateData: {
                  name: submitData.name,
                },
              },
            },
          })
      }
    },
    [mutateEnum, mutateSimple, mutateType, state],
  )

  const kind = state?.metadata?.__typename
    ? typenameToKind(state?.metadata?.__typename)
    : null

  const type = state.metadata as __TypeFragment

  const modelRef = useRef({
    name: type?.name,
    primitiveType:
      type?.__typename === 'SimpleType' ? type?.primitiveType : undefined,
    allowedValues:
      type?.__typename === 'EnumType' ? type?.allowedValues : undefined,
  })

  if (!type || !state.updateId) {
    return null
  }

  return (
    <FormUniforms<UpdateTypeSchema>
      onSubmit={handleSubmit}
      schema={updateTypeSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating type',
      })}
      onSubmitSuccess={() => reset()}
      model={modelRef.current}
      {...props}
    >
      <AutoFields fields={['name']} />

      {kind === TypeKind.Simple && <AutoField name={'primitiveType'} />}
      {kind === TypeKind.Enum && <AutoField name={'allowedValues'} />}
    </FormUniforms>
  )
}
