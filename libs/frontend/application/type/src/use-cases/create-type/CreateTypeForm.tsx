'use client'
import type { ITypeCreateFormData } from '@codelab/frontend-abstract-domain'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useTypeService } from '../../services'
import { TypeSelect } from '../select-types/TypeSelect'
import { createTypeSchema } from './create-type.schema'
import { DisplayIfKind } from './DisplayIfKind'

export const CreateTypeForm = ({
  onSubmitSuccess,
  showFormControl = true,
  submitRef,
}: IFormController) => {
  const typeService = useTypeService()

  const onSubmit = (data: ITypeCreateFormData) => {
    const input = {
      ...data,
      allowedValues: data.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    return typeService.create(input)
  }

  return (
    <Form<ITypeCreateFormData>
      errorMessage="Error while creating type"
      model={
        {
          id: v4(),
        } as ITypeCreateFormData
      }
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={createTypeSchema}
      submitRef={submitRef}
      successMessage="Type created successfully"
      uiKey={UiKey.TypeFormCreate}
    >
      <AutoFields fields={['name']} />
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
        <TypeSelect label="Array item type" name="arrayItemTypeId" />
      </DisplayIfKind>

      <DisplayIfKind kind={ITypeKind.ElementType}>
        <SelectField label="Element kind" name="elementKind" showSearch />
      </DisplayIfKind>

      <DisplayIfKind kind={ITypeKind.CodeMirrorType}>
        <AutoField label="Language" name="language" />
      </DisplayIfKind>

      <DisplayIf condition={showFormControl}>
        <FormController submitLabel="Create Type" />
      </DisplayIf>
    </Form>
  )
}
