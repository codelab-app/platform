import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  ITypeKind,
  ITypeService,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateTypeSchema } from './update-type.schema'
import { validateNonRecursive } from './validate-non-recursive'

export const UpdateTypeModal = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const closeModal = () => typeService.updateModal.close()
    const typeToUpdate = typeService.updateModal.type

    const handleSubmit = async (submitData: IUpdateTypeDTO) => {
      if (!typeToUpdate) {
        throw new Error('Type not set for typeStore.updateModal.')
      }

      await validateNonRecursive(typeToUpdate.id, submitData)

      return typeService.update(typeToUpdate, submitData)
    }

    const model = {
      name: typeToUpdate?.name,
      kind: typeToUpdate?.kind,
      primitiveKind:
        typeToUpdate?.kind === ITypeKind.PrimitiveType
          ? typeToUpdate?.primitiveKind
          : undefined,
      allowedValues:
        typeToUpdate?.kind === ITypeKind.EnumType
          ? typeToUpdate?.allowedValues ?? undefined
          : undefined,
      unionTypeIds:
        typeToUpdate?.kind === ITypeKind.UnionType
          ? typeToUpdate?.typesOfUnionTypeIds,
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
        <ModalForm.Form<IUpdateTypeDTO>
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
          {typeToUpdate.kind === ITypeKind.UnionType && (
            <AutoField name="unionTypeIds" types={typeService.typesList} />
          )}
          {typeToUpdate.kind === ITypeKind.PrimitiveType && (
            <AutoField name="primitiveKind" />
          )}
          {typeToUpdate.kind === ITypeKind.EnumType && (
            <AutoField name="allowedValues" />
          )}
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
