'use client'

import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import type { IFormController } from '@codelab/frontend/abstract/types'
import type {
  IFieldDefaultValueFormData,
  IRef,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import type { Maybe, Nullish, ObjectLike } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'

import { UiKey } from '@codelab/frontend/abstract/types'
import { uniformSchemaFactory } from '@codelab/frontend/presentation/components/interface-form'
import {
  maxLengthMsg,
  minLengthMsg,
  pattrenMsg,
  requiredMsg,
} from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Form } from '@codelab/frontend-presentation-components-form'
import {
  GeneralValidationRules,
  StringValidationRules,
} from '@codelab/shared/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gqlgen'
import { useMemo } from 'react'
import { AutoFields } from 'uniforms-antd'

interface FieldDefaultValueFormProps extends IFormController {
  fieldType: IRef
  model?: ObjectLike
  validationRules?: Nullish<IValidationRules>
  onSubmit(data: IFieldDefaultValueFormData): Promise<unknown>
}

export const FieldDefaultValueForm = ({
  fieldType,
  model,
  onSubmit,
  validationRules,
}: FieldDefaultValueFormProps) => {
  const { typeDomainService } = useDomainStore()
  const nullabel = validationRules?.general?.[GeneralValidationRules.Nullable]
  const type = typeDomainService.type(fieldType.id)
  // Typecasting just for conditional check if field type is primitive
  const primitiveKind = (type as Maybe<IPrimitiveTypeModel>)?.primitiveKind
  // This prevents a nullable boolean when switching from another type to boolean
  // Cant move this yet to ajv schema since fieldType is id and cannot determine primitive kind
  const isRequired = primitiveKind === PrimitiveTypeKind.Boolean || !nullabel
  const minLength = validationRules?.String?.[StringValidationRules.MinLength]
  const maxLength = validationRules?.String?.[StringValidationRules.MaxLength]
  const pattren = validationRules?.String?.[StringValidationRules.Pattern]

  const schema: JSONSchemaType<IFieldDefaultValueFormData> = useMemo(
    () => ({
      errors: {
        defaultValues: {
          maxLength: maxLengthMsg('Default Values', maxLength ?? 9999),
          minLength: minLengthMsg('Default Values', minLength ?? 0),
          pattren: pattren ? pattrenMsg('Default Values', pattren) : undefined,
          required: isRequired ? requiredMsg('Default Values') : undefined,
        },
      },
      label: '',
      properties: {
        defaultValues: type.toJsonSchema({
          uniformSchema: uniformSchemaFactory,
          validationRules: validationRules,
        }),
      },
      required: isRequired ? ['defaultValues'] : [],
      type: 'object',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type.id, isRequired],
  )

  return (
    <Form<IFieldDefaultValueFormData>
      errorMessage="Error while creating field"
      model={model ?? {}}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={schema}
      submitRef={submitRef}
      successMessage="Field created successfully"
      uiKey={UiKey.FieldFormSelectDefaultValue}
    >
      <AutoFields />
    </Form>
  )
}
