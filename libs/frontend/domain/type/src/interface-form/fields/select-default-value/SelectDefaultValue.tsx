import type {
  IPrimitiveType,
  IPropData,
  ITypeService,
  IValidationRules,
} from '@codelab/frontend/abstract/core'
import { Form } from '@codelab/frontend/view/components'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'
import isNil from 'lodash/isNil'
import React, { useMemo } from 'react'
import { useField } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { schemaTransformer } from '../../../store'

export interface SelectDefaultValueProps {
  typeService: ITypeService
}

export const SelectDefaultValue = ({
  typeService,
}: SelectDefaultValueProps) => {
  const [fieldType, context] = useField<{ value?: string }>('fieldType', {})

  const [validationRules] = useField<{ value?: IValidationRules }>(
    'validationRules',
    {},
  )

  const type = fieldType.value
    ? typeService.type(fieldType.value as string)
    : null

  // Typecasting just for conditional check if field type is primitive
  const primitiveKind = (type as Maybe<IPrimitiveType>)?.primitiveKind

  // This prevents a nullable boolean when switching from another type to boolean
  // Cant move this yet to ajv schema since fieldType is id and cannot determine primitive kind
  const isRequired =
    !validationRules.value?.general?.nullable ||
    primitiveKind === PrimitiveTypeKind.Boolean

  const schema = useMemo(
    () => ({
      label: '',
      properties: type
        ? { defaultValues: schemaTransformer.transform(type) }
        : {},
      required: isRequired ? ['defaultValues'] : undefined,
      type: 'object',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type?.id, isRequired],
  )

  const defaultValues =
    !context.model.defaultValues && type?.kind === ITypeKind.ArrayType
      ? []
      : context.model.defaultValues

  const hasError =
    context.submitted && isRequired && isNil(context.model.defaultValues)

  // TODO: make code mirror input have an error state
  // Simple approach for now is to just display the error message for the `defaultValues` below it
  return (
    <Form
      model={{ defaultValues }}
      onChange={(key, value) => {
        const formattedValue = value === '' ? undefined : value
        context.onChange(key, formattedValue)
      }}
      onSubmit={() => Promise.resolve()}
      schema={schema as JSONSchemaType<IPropData>}
    >
      <AutoFields />
      {hasError && (
        <p style={{ color: 'red', marginTop: -30 }}>
          Default values is required if not nullable
        </p>
      )}
    </Form>
  )
}
