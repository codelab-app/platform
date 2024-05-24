import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import type { ICreateTypeDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect } from '../TypeSelect'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer(() => {
  const { typeService } = useStore()
  const isOpen = typeService.createModal.isOpen
  const closeModal = () => typeService.createModal.close()

  const onSubmit = async (data: ICreateTypeDto) => {
    const input = {
      ...data,
      allowedValues: data.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    return await typeService.create(input)
  }

  return (
    <ModalForm.Modal
      okText="Create"
      onCancel={closeModal}
      open={isOpen}
      title={<span className="font-semibold">Create type</span>}
    >
      <ModalForm.Form<ICreateTypeDto>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating type',
        })}
        onSubmitSuccess={closeModal}
        schema={createTypeSchema}
        uiKey={MODEL_ACTION.CreateType.key}
      >
        <AutoFields fields={['name', 'owner']} />
        <SelectField name="kind" showSearch />

        <DisplayIfKind kind={ITypeKind.PrimitiveType}>
          <SelectField name="primitiveKind" showSearch />
        </DisplayIfKind>

        <DisplayIfKind kind={ITypeKind.UnionType}>
          <AutoField name="unionTypeIds" />
        </DisplayIfKind>

        <DisplayIfKind kind={ITypeKind.EnumType}>
          <AutoField name="allowedValues" />
        </DisplayIfKind>

        <DisplayIfKind kind={ITypeKind.ArrayType}>
          <TypeSelect label="Array item type" name="arrayTypeId" />
        </DisplayIfKind>

        <DisplayIfKind kind={ITypeKind.ElementType}>
          <SelectField label="Element kind" name="elementKind" showSearch />
        </DisplayIfKind>

        <DisplayIfKind kind={ITypeKind.CodeMirrorType}>
          <AutoField label="Language" name="language" />
        </DisplayIfKind>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
