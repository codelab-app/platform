import { ITypeService, IUpdateTypeDTO } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
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

      const data = {
        ...submitData,
        allowedValues: submitData.allowedValues?.map((val) => ({
          key: val.key,
          value: val.value,
          id: val.id || v4(),
        })),
      }

      await validateNonRecursive(typeToUpdate.id, data)

      return typeService.update(typeToUpdate, data)
    }

    const model = {
      name: typeToUpdate?.name,
      kind: typeToUpdate?.kind,
      primitiveKind:
        typeToUpdate?.kind === ITypeKind.PrimitiveType
          ? typeToUpdate.primitiveKind
          : undefined,
      allowedValues:
        typeToUpdate?.kind === ITypeKind.EnumType
          ? typeToUpdate.allowedValues
          : undefined,
      unionTypeIds:
        typeToUpdate?.kind === ITypeKind.UnionType
          ? typeToUpdate.typesOfUnionType.map((t) => t.id)
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
