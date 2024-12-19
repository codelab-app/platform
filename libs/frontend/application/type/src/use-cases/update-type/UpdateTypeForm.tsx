import type {
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type { IFormController } from '@codelab/frontend/abstract/types'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields, SelectField } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useTypeService } from '../../services'
import { DisplayIfKind } from '../create-type/DisplayIfKind'
import { TypeSelect } from '../select-types/TypeSelect'
import { updateTypeSchema } from './update-type.schema'
import { validateNonRecursive } from './validate-non-recursive'

interface UpdateAtomFormProps extends IFormController {
  type: ITypeModel
}

export const UpdateTypeForm = observer<UpdateAtomFormProps>((props) => {
  const { typeDomainService } = useDomainStore()
  const typeService = useTypeService()
  const typeToUpdate = props.type

  const handleSubmit = async (submitData: ITypeUpdateDto) => {
    const data = {
      ...submitData,
      allowedValues: submitData.allowedValues?.map((val) => ({
        ...val,
        id: v4(),
      })),
    }

    await validateNonRecursive(typeToUpdate.id, data)

    await typeService.update(data)
  }

  const model = {
    allowedValues:
      typeToUpdate.kind === ITypeKind.EnumType
        ? typeToUpdate.allowedValues.map((val) => ({
            // Convert allowedValues from mobx models to simple objects
            // otherwise uniform won't be able to update current values
            id: val.id,
            key: val.key,
            value: val.value,
          }))
        : undefined,
    arrayItemTypeId:
      typeToUpdate.kind === ITypeKind.ArrayType
        ? typeToUpdate.itemType?.id
        : undefined,
    elementKind:
      typeToUpdate.kind === ITypeKind.ElementType
        ? typeToUpdate.elementKind
        : undefined,
    id: typeToUpdate.id,
    kind: typeToUpdate.kind,
    language:
      typeToUpdate.kind === ITypeKind.CodeMirrorType
        ? typeToUpdate.language
        : undefined,
    name: typeToUpdate.name,
    primitiveKind:
      typeToUpdate.kind === ITypeKind.PrimitiveType
        ? typeToUpdate.primitiveKind
        : undefined,
    unionTypeIds:
      typeToUpdate.kind === ITypeKind.UnionType
        ? typeToUpdate.typesOfUnionType.map(({ id }) => id)
        : undefined,
  }

  return (
    <Form<ITypeUpdateDto>
      errorMessage="Error while updating type"
      model={model}
      onSubmit={handleSubmit}
      onSubmitSuccess={props.onSubmitSuccess}
      schema={updateTypeSchema}
      submitRef={props.submitRef}
      successMessage="Type updated successfully"
      uiKey={UiKey.TypeFormUpdate}
    >
      <AutoFields fields={['name']} />
      {typeToUpdate.kind === ITypeKind.UnionType && (
        <AutoField name="unionTypeIds" types={typeDomainService.typesList} />
      )}
      {typeToUpdate.kind === ITypeKind.PrimitiveType && (
        <AutoField name="primitiveKind" />
      )}
      {typeToUpdate.kind === ITypeKind.EnumType && (
        <AutoField name="allowedValues" />
      )}
      <DisplayIfKind kind={ITypeKind.ArrayType}>
        <TypeSelect label="Array Item Type" name="arrayItemTypeId" />
      </DisplayIfKind>
      <DisplayIfKind kind={ITypeKind.CodeMirrorType}>
        <AutoField label="Language" name="language" />
      </DisplayIfKind>
      <DisplayIfKind kind={ITypeKind.ElementType}>
        <SelectField label="Element kind" name="elementKind" showSearch />
      </DisplayIfKind>

      <DisplayIf condition={props.showFormControl ?? true}>
        <FormController submitLabel="Update Type" />
      </DisplayIf>
    </Form>
  )
})
