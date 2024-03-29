import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Form } from '@codelab/frontend/presentation/view'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { IPropData, IValidationRules } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { useAsync, useMountEffect } from '@react-hookz/web'
import type { JSONSchemaType } from 'ajv'
import isNil from 'lodash/isNil'
import React, { useMemo } from 'react'
import { useField } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { schemaTransformer } from '../../type-schema.factory'

export const SelectDefaultValue = () => {
  const { typeService } = useStore()

  // Need to load the type if not loaded yet
  // otherwise default value form will not be rendered
  const [, getType] = useAsync(() =>
    typeService.getAll(fieldType.value ? [fieldType.value] : []),
  )

  useMountEffect(getType.execute)

  const [fieldType, context] = useField<{ value?: string }>('fieldType', {})

  const [validationRules] = useField<{ value?: IValidationRules }>(
    'validationRules',
    {},
  )

  const type = fieldType.value
    ? typeService.type(fieldType.value as string)
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
        ? { defaultValues: schemaTransformer.transform(type) }
        : {},
      required: isRequired ? ['defaultValues'] : undefined,
      type: 'object',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type?.id, isRequired],
  )

  let defaultValues = context.model.defaultValues
  const currentFieldType = React.useRef(fieldType.value)

  if (
    isNil(defaultValues) ||
    (fieldType.changed && currentFieldType.current !== fieldType.value)
  ) {
    currentFieldType.current = fieldType.value

    if (type?.kind === ITypeKind.ArrayType) {
      defaultValues = []
      // Sets initial value of `defaultValues` in the parent form model
      context.onChange('defaultValues', defaultValues)
    }

    if (type?.kind === ITypeKind.UnionType) {
      defaultValues = {
        kind: type.typesOfUnionType[0]?.current.kind,
        type: type.typesOfUnionType[0]?.id,
      }
      // Sets initial value of `defaultValues` in the parent form model
      context.onChange('defaultValues', defaultValues)
    }
  }

  const hasError =
    context.submitted && isRequired && isNil(context.model.defaultValues)

  // TODO: make code mirror input have an error state
  // Simple approach for now is to just display the error message for the `defaultValues` below it
  return (
    <div
      // key is needed here to re-create this form with a
      // new model and schema when the field type is changed
      key={`${fieldType.value}-default-values`}
    >
      <Form
        model={{ defaultValues }}
        onChange={(key, value) => {
          const formattedValue = value === '' ? undefined : value

          context.onChange(key, formattedValue)
        }}
        onSubmit={() => Promise.resolve()}
        schema={schema as JSONSchemaType<IPropData>}
        uiKey={MODEL_ACTION.SelectDefaultValueField.key}
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
