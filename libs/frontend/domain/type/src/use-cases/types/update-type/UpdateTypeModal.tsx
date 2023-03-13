import type {
  ITypeService,
  IUpdateTypeData,
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

    const typeToUpdate = typeService.types.get(
      typeService.updateModal.type?.id ?? '',
    )

    const handleSubmit = async (submitData: IUpdateTypeData) => {
      const data = {
        ...submitData,
        allowedValues: submitData.allowedValues?.map((val) => ({
          ...val,
          id: v4(),
        })),
      }

      await validateNonRecursive(typeToUpdate?.id, data)

      await typeService.update(data)
      void typeService.getBaseTypes({}).then(() => undefined)
    }

    const model = {
      allowedValues:
        typeToUpdate?.kind === ITypeKind.EnumType
          ? typeToUpdate.allowedValues.map((val) => ({
              // Convert allowedValues from mobx models to simple objects
              // otherwise uniform won't be able to update current values
              id: val.current.id,
              key: val.current.key,
              value: val.current.value,
            }))
          : undefined,
      arrayTypeId:
        typeToUpdate?.kind === ITypeKind.ArrayType
          ? typeToUpdate.itemType?.id
          : undefined,
      elementKind:
        typeToUpdate?.kind === ITypeKind.ElementType
          ? typeToUpdate.elementKind
          : undefined,
      id: typeToUpdate?.id,
      kind: typeToUpdate?.kind,
      language:
        typeToUpdate?.kind === ITypeKind.CodeMirrorType
          ? typeToUpdate.language
          : undefined,
      name: typeToUpdate?.name,
      owner: typeToUpdate?.owner,
      primitiveKind:
        typeToUpdate?.kind === ITypeKind.PrimitiveType
          ? typeToUpdate.primitiveKind
          : undefined,
      unionTypeIds:
        typeToUpdate?.kind === ITypeKind.UnionType
          ? typeToUpdate.typesOfUnionType.map(({ id }) => id)
          : undefined,
    }

    return (
      <ModalForm.Modal
        className="update-type-modal"
        okText="Update"
        onCancel={closeModal}
        open={typeService.updateModal.isOpen}
        title={<span css={tw`font-semibold`}>Update type</span>}
      >
        <ModalForm.Form<IUpdateTypeData>
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
          {typeToUpdate?.kind === ITypeKind.UnionType && (
            <AutoField name="unionTypeIds" types={typeService.typesList} />
          )}
          {typeToUpdate?.kind === ITypeKind.PrimitiveType && (
            <AutoField name="primitiveKind" />
          )}
          {typeToUpdate?.kind === ITypeKind.EnumType && (
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
