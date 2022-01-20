import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { typenameToTypeKind } from '../../../shared'
import { UpdateTypeSchema, updateTypeSchema } from './updateTypeSchema'
import { useUpdateTypeForm } from './useUpdateTypeForm'

export const UpdateTypeModal = () => {
  const {
    isLoading,
    onSubmitError,
    onSubmitSuccess,
    onSubmit,
    reset,
    entity,
    model,
    actionType,
  } = useUpdateTypeForm()

  return (
    <FormModal
      className="update-type-modal"
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Update"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Update type</span>}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => {
        if (!entity) {
          return <></>
        }

        const kind = typenameToTypeKind(entity?.__typename)

        return (
          <Form<UpdateTypeSchema>
            model={model}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            onSubmitSuccess={onSubmitSuccess}
            schema={updateTypeSchema}
            submitRef={submitRef}
          >
            <AutoFields fields={['name']} />
            {kind === TypeKind.UnionType && (
              <AutoField name="typeIdsOfUnionType" />
            )}
            {kind === TypeKind.PrimitiveType && (
              <AutoField name="primitiveKind" />
            )}
            {kind === TypeKind.EnumType && <AutoField name="allowedValues" />}
          </Form>
        )
      }}
    </FormModal>
  )
}
