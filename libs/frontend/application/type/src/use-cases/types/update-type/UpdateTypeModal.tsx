import type { IUpdateTypeDto } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { DisplayIfKind } from '../create-type/DisplayIfKind'
import { TypeSelect } from '../TypeSelect'
import { updateTypeSchema } from './update-type.schema'
import { validateNonRecursive } from './validate-non-recursive'

export const UpdateTypeModal = observer(() => {
  const { typeService } = useStore()
  const closeModal = () => typeService.updateModal.close()

  const typeToUpdate = typeService.typeDomainService.types.get(
    typeService.updateModal.type?.id ?? '',
  )

  const handleSubmit = async (submitData: IUpdateTypeDto) => {
    const data = {
      ...submitData,
      allowedValues: submitData.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    await validateNonRecursive(typeToUpdate?.id, data)

    await typeService.update(data)
  }

  const model = {
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
      okText="Update"
      onCancel={closeModal}
      open={typeService.updateModal.isOpen}
      title={<span className="font-semibold">Update type</span>}
    >
      <ModalForm.Form<IUpdateTypeDto>
        model={model}
        onSubmit={handleSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating type',
        })}
        onSubmitSuccess={closeModal}
        schema={updateTypeSchema}
        uiKey={MODEL_ACTION.UpdateType.key}
      >
        <AutoFields fields={['name']} />
        {typeToUpdate?.kind === ITypeKind.UnionType && (
          <AutoField
            name="unionTypeIds"
            types={typeService.typeDomainService.typesList}
          />
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
})
