'use client'

import type { IPrimitiveTypeModel } from '@codelab/frontend-abstract-domain'
import type { IFormController } from '@codelab/frontend-abstract-types'
import type {
  IFieldDefaultValueFormData,
  IRef,
  IValidationRules,
} from '@codelab/shared-abstract-core'
import type { Maybe, Nullish, ObjectLike } from '@codelab/shared-abstract-types'
import type { JSONSchemaType } from 'ajv'

import { UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  ExpressionAutoField,
  Form,
} from '@codelab/frontend-presentation-components-form'
import { GeneralValidationRules } from '@codelab/shared-abstract-core'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'
import { useMemo } from 'react'

interface FieldDefaultValueFormProps extends IFormController {
  errorMessage?: string
  fieldType: IRef
  model?: ObjectLike
  successMessage?: string
  validationRules?: Nullish<IValidationRules>
  onSubmit(data: IFieldDefaultValueFormData): Promise<unknown>
}

export const FieldDefaultValueForm = ({
  errorMessage,
  fieldType,
  model,
  onSubmit,
  onSubmitSuccess,
  submitRef,
  successMessage,
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
  // const minLength = validationRules?.String?.[StringValidationRules.MinLength]
  // const maxLength = validationRules?.String?.[StringValidationRules.MaxLength]
  // const pattren = validationRules?.String?.[StringValidationRules.Pattern]
  // errors: {
  //   defaultValues: {
  //     value: {
  //       maxLength: maxLengthMsg('Default Value', maxLength ?? 9999),
  //       minLength: minLengthMsg('Default Value', minLength ?? 0),
  //       pattren: pattren ? pattrenMsg('Default Value', pattren) : undefined,
  //       required: isRequired ? requiredMsg('Default Value') : undefined,
  //     },
  //   },
  // },

  // @ts-expect-error maybe we can solve this using union
  const schema: JSONSchemaType<IFieldDefaultValueFormData> = useMemo(
    () => ({
      label: '',
      properties: {
        defaultValues: type.toJsonSchema({
          fieldName: 'defaultValues',
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
      errorMessage={errorMessage}
      model={model ?? {}}
      onSubmit={onSubmit}
      onSubmitSuccess={onSubmitSuccess}
      schema={schema}
      submitRef={submitRef}
      successMessage={successMessage}
      uiKey={UiKey.FieldFormSelectDefaultValue}
    >
      <ExpressionAutoField name="defaultValues" />
    </Form>
  )
}
