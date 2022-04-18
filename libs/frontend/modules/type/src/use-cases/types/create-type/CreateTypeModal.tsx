import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect, typeSelectOptions } from '../../../shared'
import { WithTypeService } from '../../../store'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer<WithTypeService>(({ typeService }) => {
  const closeModal = () => typeService.createModal.close()
  const { user } = useUser()

  return (
    <ModalForm.Modal
      className="create-type-modal"
      okText="Create"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Create type</span>}
      visible={typeService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateTypeDTO>
        model={{
          id: v4(),
        }}
        onSubmit={async (data) => {
          if (!user?.sub) {
            throw new Error('Missing error')
          }

          return typeService.create(data, user?.sub)
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
        <DisplayIfKind kind={ITypeKind.PrimitiveType}>
          <SelectField name="primitiveKind" showSearch />
        </DisplayIfKind>
        <DisplayIfKind kind={ITypeKind.UnionType}>
          <AutoField
            createTypeOptions={typeSelectOptions}
            name="typeIdsOfUnionType"
            typeService={typeService}
          />
        </DisplayIfKind>
        {/* <ListField name="unionTypes" />; */}
        <DisplayIfKind kind={ITypeKind.EnumType}>
          <AutoField name="allowedValues" />
        </DisplayIfKind>
        <DisplayIfKind kind={ITypeKind.ArrayType}>
          <TypeSelect
            label="Array item type"
            name="arrayItemTypeId"
            typeService={typeService}
          />
        </DisplayIfKind>
        <DisplayIfKind kind={ITypeKind.ElementType}>
          <SelectField label="Element kind" name="elementKind" showSearch />
        </DisplayIfKind>
        <DisplayIfKind kind={ITypeKind.MonacoType}>
          <AutoField label="Language" name="language" />
        </DisplayIfKind>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
