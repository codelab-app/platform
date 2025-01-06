'use client'

import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import type { IPropData, IValidationRules } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'

import { UiKey } from '@codelab/frontend/abstract/types'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Form } from '@codelab/frontend-presentation-components-form'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { PrimitiveTypeKind } from '@codelab/shared/infra/gql'
import { useMemo, useRef } from 'react'
import { useAsyncFn, useMount } from 'react-use'
import { isNullish } from 'remeda'
import { useField } from 'uniforms'
import { AutoFields } from 'uniforms-antd'

import { uniformSchemaFactory as uniformSchema } from '../../uniform-schema'

export const SelectDefaultValue = () => {
  const { typeDomainService } = useDomainStore()

  // Need to load the type if not loaded yet
  // otherwise default value form will not be rendered
  const [getTypeState, getType] = useAsyncFn(() =>
    typeRepository.getAll(fieldType.value ? [fieldType.value] : []),
  )

  useMount(() => {
    void getType()
  })

  const [fieldType, context] = useField<{ value?: string }>('fieldType', {})

  const [validationRules] = useField<{ value?: IValidationRules }>(
    'validationRules',
    {},
  )

  const type = fieldType.value
    ? typeDomainService.getType(fieldType.value as string)
    : null

  // Typecasting just for conditional check if field type is primitive
  const primitiveKind = (type as Maybe<IPrimitiveTypeModel>)?.primitiveKind
  // This prevents a nullable boolean when switching from another type to boolean
  // Cant move this yet to ajv schema since fieldType is id and cannot determine primitive kind
  const isRequired = primitiveKind === PrimitiveTypeKind.Boolean

  const schema = useMemo(
    () => ({
      label: '',
      properties: type
        ? {
            defaultValues: type.toJsonSchema({
              uniformSchema,
              validationRules: validationRules.value,
            }),
          }
        : {},
      required: isRequired ? ['defaultValues'] : undefined,
      type: 'object',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type?.id, isRequired],
  )

  let defaultValues = context.model.defaultValues
  const currentFieldType = useRef(fieldType.value)

  if (
    isNullish(defaultValues) ||
    (fieldType.changed && currentFieldType.current !== fieldType.value)
  ) {
    currentFieldType.current = fieldType.value

    if (type?.kind === ITypeKind.ArrayType) {
      defaultValues = []
      // Sets initial value of `defaultValues` in the parent form model
      context.onChange('defaultValues', defaultValues)
    }

    if (type?.kind === ITypeKind.UnionType) {
      defaultValues = ''
      // Sets initial value of `defaultValues` in the parent form model
      context.onChange('defaultValues', defaultValues)
    }
  }

  const hasError =
    context.submitted && isRequired && isNullish(context.model.defaultValues)

  // TODO: make code mirror input have an error state
  // Simple approach for now is to just display the error message for the `defaultValues` below it
  return (
    <div
      // key is needed here to re-create this form with a
      // new model and schema when the field type is changed
      key={`${fieldType.value}-default-values`}
      onKeyDown={(event: React.KeyboardEvent) => {
        // prevent form submit when enter is pressed inside "defaultValues" field
        if (event.key === 'Enter') {
          event.preventDefault()
        }
      }}
    >
      <Form
        model={{ defaultValues }}
        onChange={(key, value) => {
          const formattedValue = value === '' ? undefined : value

          context.onChange(key, formattedValue)
        }}
        onSubmit={() => Promise.resolve()}
        schema={schema as JSONSchemaType<IPropData>}
        uiKey={UiKey.FieldFormSelectDefaultValue}
      >
        <AutoFields />
        {hasError && (
          <p style={{ color: 'red', marginTop: -30 }}>
            Default values is required if not nullable
          </p>
        )}
      </Form>
    </div>
  )
}
