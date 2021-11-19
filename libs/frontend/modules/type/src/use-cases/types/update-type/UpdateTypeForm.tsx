import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useTypeState } from '../../../hooks'
import { typenameToTypeKind } from '../../../shared'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { UpdateTypeSchema, updateTypeSchema } from './updateTypeSchema'

export const UpdateTypeForm = (
  props: Omit<FormUniformsProps<UpdateTypeSchema>, 'schema'>,
) => {
  const { entity } = useTypeState()

  if (!entity) {
    return null
  }

  const kind = typenameToTypeKind(entity.__typename)

  return (
    <FormUniforms<UpdateTypeSchema> schema={updateTypeSchema} {...props}>
      <AutoFields fields={['name']} />

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
