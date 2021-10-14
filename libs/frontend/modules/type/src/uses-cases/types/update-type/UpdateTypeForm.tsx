import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React, { useCallback, useEffect, useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeFragment } from '../../../graphql/Type.fragment.graphql.gen'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { typenameToTypeKind } from '../../../type-tree'
import { refetchGetTypesQuery } from '../get-types/GetTypes.web.graphql.gen'
import { TypeModels } from '../TypeModels'
import {
  useUpdateEnumTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateTypeMutation,
  useUpdateUnionTypeMutation,
} from './UpdateType.web.graphql.gen'
import { UpdateTypeSchema, updateTypeSchema } from './updateTypeSchema'

export const UpdateTypeForm = (
  props: UniFormUseCaseProps<UpdateTypeSchema>,
) => {
  const { setLoading, state, reset } = useCrudModalForm(EntityType.Type)
  const mutationOptions = { refetchQueries: [refetchGetTypesQuery()] }

  const [mutateUnion, unionMutationData] =
    useUpdateUnionTypeMutation(mutationOptions)

  const [mutatePrimitive, primitiveMutationData] =
    useUpdatePrimitiveTypeMutation(mutationOptions)

  const [mutateEnum, enumMutationData] =
    useUpdateEnumTypeMutation(mutationOptions)

  const [mutateType, typeMutationData] = useUpdateTypeMutation(mutationOptions)

  useEffect(() => {
    const loading =
      primitiveMutationData.loading ||
      enumMutationData.loading ||
      typeMutationData.loading ||
      unionMutationData.loading

    setLoading(loading)
  }, [
    primitiveMutationData.loading,
    enumMutationData.loading,
    typeMutationData.loading,
    setLoading,
    unionMutationData.loading,
  ])

  const handleSubmit = useCallback(
    (submitData: UpdateTypeSchema) => {
      const kind = typenameToTypeKind(state?.metadata?.__typename)

      const baseUpdateTypeData = {
        tagIds: submitData.tagIds,
      }

      switch (kind) {
        case TypeKind.UnionType:
          if (
            submitData.typeIdsOfUnionType &&
            submitData.typeIdsOfUnionType.length > 0
          ) {
            return mutateUnion({
              variables: {
                input: {
                  typeId: state.updateId,
                  updateData: {
                    ...baseUpdateTypeData,
                    name: submitData.name,
                    typeIdsOfUnionType: submitData.typeIdsOfUnionType,
                  },
                },
              },
            })
          }

          throw new Error('Union item types not set')

        case TypeKind.PrimitiveType:
          if (!submitData.primitiveKind) {
            throw new Error('Primitive type not set')
          }

          return mutatePrimitive({
            variables: {
              input: {
                typeId: state.updateId,
                updateData: {
                  ...baseUpdateTypeData,
                  name: submitData.name,
                  primitiveKind: submitData.primitiveKind,
                },
              },
            },
          })
        case TypeKind.EnumType:
          if (!submitData.allowedValues) {
            throw new Error('Allowed values not set')
          }

          return mutateEnum({
            variables: {
              input: {
                typeId: state.updateId,
                updateData: {
                  ...baseUpdateTypeData,
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
                  ...baseUpdateTypeData,
                  name: submitData.name,
                },
              },
            },
          })
      }
    },
    [mutateEnum, mutatePrimitive, mutateUnion, mutateType, state],
  )

  const kind = state?.metadata?.__typename
    ? typenameToTypeKind(state?.metadata?.__typename)
    : null

  const type = state.metadata as TypeFragment

  const modelRef = useRef({
    name: type?.name,
    primitiveKind:
      type?.__typename === TypeModels.PrimitiveType
        ? type?.primitiveKind
        : undefined,
    allowedValues:
      type?.__typename === TypeModels.EnumType
        ? type?.allowedValues
        : undefined,
    typeIdsOfUnionType:
      type?.__typename === TypeModels.UnionType
        ? type?.typeIdsOfUnionType
        : undefined,
    tagIds: type?.tags?.map((t) => t.id),
  })

  console.log({ modelRef, updateTypeSchema })

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
      <AutoFields fields={['name', 'tagIds']} />

      {kind === TypeKind.UnionType && (
        <AutoField
          createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
          name={'typeIdsOfUnionType'}
        />
      )}
      {kind === TypeKind.PrimitiveType && <AutoField name={'primitiveKind'} />}
      {kind === TypeKind.EnumType && <AutoField name={'allowedValues'} />}
    </FormUniforms>
  )
}
