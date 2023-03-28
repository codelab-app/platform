import type { ICreateTypeData, IType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect, typeSelectOptions } from '../../../shared'
import { typeRef } from '../../../store'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeModal = observer(() => {
  const { typeService, userService } = useStore()
  const [typesList, setTypesList] = useState<Array<IType>>([])
  const isOpen = typeService.createModal.isOpen
  const closeModal = () => typeService.createModal.close()

  const onSubmit = async (data: ICreateTypeData) => {
    const input = {
      ...data,
      allowedValues: data.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    const type = await typeService.create(input)
    await typeService.pagination.data.set(type.id, typeRef(type))
  }

  /**
   * get typesList only when modal is opened (or closed).
   * Otherwise, if typeService.typesList is directly accessed
   * it will cause the entire component to rerender on submit
   * even before submit has finalized because we update local
   * cache first.
   */
  useEffect(() => {
    setTypesList(typeService.typesList)
  }, [typeService, isOpen])

  return (
    <ModalForm.Modal
      className="create-type-modal"
      okText="Create"
      onCancel={closeModal}
      open={isOpen}
      title={<span css={tw`font-semibold`}>Create type</span>}
    >
      <ModalForm.Form<ICreateTypeData>
        model={{
          id: v4(),
          owner: { auth0Id: userService.user?.auth0Id },
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
            types={typesList}
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
