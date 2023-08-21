import type { ICreateTypeData } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { TypeSelect, typeSelectOptions } from '../../../shared'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

interface CreateTypeFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateTypeForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreateTypeFormProps) => {
    const { typeService, userService } = useStore()
    const closeForm = () => typeService.createForm.close()

    const onSubmit = async (data: ICreateTypeData) => {
      const input = {
        ...data,
        allowedValues: data.allowedValues?.map((val) => ({
          ...val,
          id: v4(),
        })),
      }

      const result = await typeService.create(input)

      onSubmitSuccess?.()

      return result
    }

    return (
      <Form<ICreateTypeData>
        model={{
          id: v4(),
          owner: { auth0Id: userService.user.auth0Id },
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating type',
          type: 'error',
        })}
        onSubmitSuccess={closeForm}
        schema={createTypeSchema}
        submitRef={submitRef}
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

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Type" />
        </DisplayIf>
      </Form>
    )
  },
)
