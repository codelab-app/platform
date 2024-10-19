'use client'

import type { ITypeCreateFormData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useTypeService } from '../../services'
import { TypeSelect } from '../select-types/TypeSelect'
import { createTypeSchema } from './create-type.schema'
import { useCreateTypeModal } from './create-type.state'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer(() => {
  const createTypeModal = useCreateTypeModal()
  const typeService = useTypeService()
  const isOpen = createTypeModal.isOpen
  const closeModal = () => createTypeModal.close()

  const onSubmit = async (data: ITypeCreateFormData) => {
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
      uiKey={UiKey.TypeModalCreate}
    >
      <ModalForm.Form<ITypeCreateFormData>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating type',
        })}
        onSubmitSuccess={closeModal}
        schema={createTypeSchema}
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
