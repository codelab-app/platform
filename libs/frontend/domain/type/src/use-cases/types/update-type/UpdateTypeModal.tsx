import type {
  ITypeService,
  IUpdateTypeDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../../../shared'
import { DisplayIfKind } from '../create-type/DisplayIfKind'
import { updateTypeSchema } from './update-type.schema'
import { validateNonRecursive } from './validate-non-recursive'

export const UpdateTypeModal = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const closeModal = () => typeService.updateModal.close()

    const typeToUpdate = typeService.updateModal.type
      ? typeService.types.get(typeService.updateModal.type.id)
      : null

    const handleSubmit = async (submitData: IUpdateTypeDTO) => {
      if (!typeToUpdate) {
        throw new Error('Type not set for typeStore.updateModal.')
      }

      const data = {
        ...submitData,
        allowedValues: submitData.allowedValues?.map((val) => ({
          ...val,
          id: v4(),
        })),
      }

      await validateNonRecursive(typeToUpdate.id, data)

      await typeService.update(typeToUpdate, data)
      void typeService.getBaseTypes({}).then(() => undefined)
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
          ? typeToUpdate.allowedValues.map((val) => ({
              // Convert allowedValues from mobx models to simple objects
              // otherwise uniform won't be able to update current values
              id: val.id,
              key: val.key,
              value: val.value,
            }))
          : undefined,
      unionTypeIds:
        typeToUpdate?.kind === ITypeKind.UnionType
          ? typeToUpdate.typesOfUnionType.map((t) => t.id)
          : undefined,
      arrayTypeId:
        typeToUpdate?.kind === ITypeKind.ArrayType
          ? typeToUpdate.itemType.id
          : undefined,
      language:
        typeToUpdate?.kind === ITypeKind.CodeMirrorType
          ? typeToUpdate.language
          : undefined,
      elementKind:
        typeToUpdate?.kind === ITypeKind.ElementType
          ? typeToUpdate.elementKind
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
        open={typeService.updateModal.isOpen}
        title={<span css={tw`font-semibold`}>Update type</span>}
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
          <DisplayIfKind kind={ITypeKind.ArrayType}>
            <TypeSelect label="Array Item Type" name="arrayTypeId" />
          </DisplayIfKind>
          <DisplayIfKind kind={ITypeKind.CodeMirrorType}>
            <AutoField label="Language" name="language" />
          </DisplayIfKind>
          <DisplayIfKind kind={ITypeKind.ElementType}>
            <SelectField label="Element kind" name="elementKind" showSearch />
          </DisplayIfKind>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
