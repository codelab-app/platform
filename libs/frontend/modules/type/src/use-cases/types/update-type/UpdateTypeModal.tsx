import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeStore } from '../../../store'
import {
  mapUpdateTypeSchemaToTypeInput,
  UpdateTypeSchema,
  updateTypeSchema,
} from './updateTypeSchema'
import { validateNonRecursive } from './validateNonRecursive'

export interface UpdateTypeModalProps {
  typeStore: TypeStore
}

export const UpdateTypeModal = observer<UpdateTypeModalProps>(
  ({ typeStore }) => {
    const { user } = useUser()
    const closeModal = () => typeStore.updateModal.close()
    const updatedType = typeStore.updateModal.type

    const handleSubmit = async (submitData: UpdateTypeSchema) => {
      if (!updatedType) {
        throw new Error('Type not set for typeStore.updateModal.')
      }

      await validateNonRecursive(updatedType.id, submitData)

      const input = mapUpdateTypeSchemaToTypeInput(
        submitData,
        updatedType,
        user?.sub,
      )

      return updatedType.update(input)
    }

    const model = {
      name: updatedType?.name,
      primitiveKind:
        updatedType?.typeKind === TypeKind.PrimitiveType
          ? updatedType?.primitiveKind
          : undefined,
      allowedValues:
        updatedType?.typeKind === TypeKind.EnumType
          ? updatedType?.allowedValues ?? undefined
          : undefined,
      typeIdsOfUnionType:
        updatedType?.typeKind === TypeKind.UnionType
          ? updatedType?.typesOfUnionType?.map((t) => t.id) ?? []
          : undefined,
    }

    if (!updatedType) {
      return null
    }

    return (
      <ModalForm.Modal
        className="update-type-modal"
        okText="Update"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Update type</span>}
        visible={typeStore.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateTypeSchema>
          model={model}
          onSubmit={handleSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while updating type',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={updateTypeSchema}
        >
          <AutoFields fields={['name']} />
          {updatedType.typeKind === TypeKind.UnionType && (
            <AutoField name="typeIdsOfUnionType" />
          )}
          {updatedType.typeKind === TypeKind.PrimitiveType && (
            <AutoField name="primitiveKind" />
          )}
          {updatedType.typeKind === TypeKind.EnumType && (
            <AutoField name="allowedValues" />
          )}
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
