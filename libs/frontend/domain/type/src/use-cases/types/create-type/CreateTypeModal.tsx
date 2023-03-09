import type {
  ICreateTypeData,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect, typeSelectOptions } from '../../../shared'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer<{
  typeService: ITypeService
  userService: IUserService
}>(({ typeService, userService }) => {
  const closeModal = () => typeService.createModal.close()
  const user = userService.user

  const onSubmit = async (data: ICreateTypeData) => {
    const input = {
      ...data,
      allowedValues: data.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    await typeService.create(input)

    /**
     * typeService.create writes into cache
     * if modal is opened -> bug: modal input values are cleared
     * void = execute typeService.queryGetTypesTableTypes, close modal, and not wait until it finishes
     */
    void typeService.getBaseTypes({}).then(() => undefined)
  }

  return (
    <ModalForm.Modal
      className="create-type-modal"
      okText="Create"
      onCancel={closeModal}
      open={typeService.createModal.isOpen}
      title={<span css={tw`font-semibold`}>Create type</span>}
    >
      <ModalForm.Form<ICreateTypeData>
        model={{
          id: v4(),
          owner: {
            auth0Id: user?.auth0Id,
          },
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating type',
          type: 'error',
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
          <AutoField
            createTypeOptions={typeSelectOptions}
            name="unionTypeIds"
            types={typeService.typesList}
          />
        </DisplayIfKind>
        {/* <ListField name="unionTypes" />; */}

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
