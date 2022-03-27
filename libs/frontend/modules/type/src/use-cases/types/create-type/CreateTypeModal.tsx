import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import {
  createNonUnionTypeOptionsForTypeSelect,
  TypeSelect,
} from '../../../shared'
import { WithTypeService } from '../../../store'
import {
  CreateTypeSchema,
  createTypeSchema,
  mapCreateTypeSchemaToInput,
} from './create-type-input.factory'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer<WithTypeService>(({ typeService }) => {
  const closeModal = () => typeService.createModal.close()
  const user = useUser()

  return (
    <ModalForm.Modal
      className="create-type-modal"
      okText="Create"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Create type</span>}
      visible={typeService.createModal.isOpen}
    >
      <ModalForm.Form<CreateTypeSchema>
        model={{}}
        onSubmit={(data) => {
          const input = mapCreateTypeSchemaToInput(data, user.user?.sub) as any

          return typeService.create(data.kind, input)
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating type',
          type: 'error',
        })}
        onSubmitSuccess={closeModal}
        schema={createTypeSchema}
      >
        <AutoFields fields={['name']} />
        <SelectField name="kind" showSearch />
        <DisplayIfKind kind={TypeKind.PrimitiveType}>
          <SelectField name="primitiveKind" showSearch />
        </DisplayIfKind>
        <DisplayIfKind kind={TypeKind.UnionType}>
          <AutoField
            createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
            name="typeIdsOfUnionType"
            typeService={typeService}
          />
        </DisplayIfKind>
        {/* <ListField name="unionTypes" />; */}
        <DisplayIfKind kind={TypeKind.EnumType}>
          <AutoField name="allowedValues" />
        </DisplayIfKind>
        <DisplayIfKind kind={TypeKind.ArrayType}>
          <TypeSelect
            label="Array item type"
            name="arrayItemTypeId"
            typeService={typeService}
          />
        </DisplayIfKind>
        <DisplayIfKind kind={TypeKind.ElementType}>
          <SelectField label="Element kind" name="elementKind" showSearch />
        </DisplayIfKind>
        <DisplayIfKind kind={TypeKind.MonacoType}>
          <AutoField label="Language" name="language" />
        </DisplayIfKind>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
