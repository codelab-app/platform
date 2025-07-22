import type { ComponentType } from 'react'

import { createElement, Fragment } from 'react'
import { useForm } from 'uniforms'

import { ExpressionAutoField } from './ExpressionAutoField'

export interface ExpressionAutoFieldsProps {
  element?: string | ComponentType
  fields?: Array<string>
  omitFields?: Array<string>
  showInlineError?: boolean
}

export const ExpressionAutoFields = ({
  element = Fragment,
  fields,
  omitFields = [],
  showInlineError,
  ...props
}: ExpressionAutoFieldsProps) => {
  const { schema } = useForm()

  return createElement(
    element,
    props,
    (fields ?? schema.getSubfields())
      .filter((field) => !omitFields.includes(field))
      .map((field) =>
        createElement(
          ExpressionAutoField,
          Object.assign(
            { key: field, name: field },
            showInlineError === undefined ? null : { showInlineError },
          ),
        ),
      ),
  )
}
