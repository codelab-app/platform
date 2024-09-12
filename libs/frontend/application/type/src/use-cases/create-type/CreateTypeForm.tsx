import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { ICreateTypeDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useTypeService } from '../../services'
import { TypeSelect } from '../select-types/TypeSelect'
import { createTypeSchema } from './create-type.schema'
import { useCreateTypeForm } from './create-type.state'
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
    const typeService = useTypeService()
    const createTypeForm = useCreateTypeForm()
    const closeForm = () => createTypeForm.close()

    const onSubmit = async (data: ICreateTypeDto) => {
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
      <Form<ICreateTypeDto>
        model={{
          id: v4(),
        }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating type',
        })}
        onSubmitSuccess={closeForm}
        schema={createTypeSchema}
        submitRef={submitRef}
        uiKey={UiKey.CreateTypeForm}
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
