import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateTypeDTO, TypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithTypeService } from '../../../store'
import { UpdateTypeSchema, updateTypeSchema } from './update-type.schema'
import { validateNonRecursive } from './validateNonRecursive'

export const UpdateTypeModal = observer<WithTypeService>(({ typeService }) => {
  const closeModal = () => typeService.updateModal.close()
  const typeToUpdate = typeService.updateModal.type

  const handleSubmit = async (submitData: UpdateTypeSchema) => {
    if (!typeToUpdate) {
      throw new Error('Type not set for typeStore.updateModal.')
    }

    await validateNonRecursive(typeToUpdate.id, submitData)

    typeToUpdate.applyUpdateData(submitData)

    return typeService.update(typeToUpdate)
  }

  const model = {
    name: typeToUpdate?.name,
    primitiveKind:
      typeToUpdate?.typeKind === TypeKind.PrimitiveType
        ? typeToUpdate?.primitiveKind
        : undefined,
    allowedValues:
      typeToUpdate?.typeKind === TypeKind.EnumType
        ? typeToUpdate?.allowedValues ?? undefined
        : undefined,
    typeIdsOfUnionType:
      typeToUpdate?.typeKind === TypeKind.UnionType
        ? typeToUpdate?.typesOfUnionType?.map((t) => t.id) ?? []
        : undefined,
  }

  if (!typeToUpdate) {
    return null
  }

  return (
    <ModalForm.Modal
      className="update-type-modal"
      okText="Update"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Update type</span>}
      visible={typeService.updateModal.isOpen}
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
        {typeToUpdate.typeKind === TypeKind.UnionType && (
          <AutoField name="typeIdsOfUnionType" />
        )}
        {typeToUpdate.typeKind === TypeKind.PrimitiveType && (
          <AutoField name="primitiveKind" />
        )}
        {typeToUpdate.typeKind === TypeKind.EnumType && (
          <AutoField name="allowedValues" />
        )}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
