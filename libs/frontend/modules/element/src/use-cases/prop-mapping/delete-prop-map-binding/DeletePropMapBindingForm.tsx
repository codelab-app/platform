import {
  DeleteUseCaseFormWithRef,
  FormProps,
} from '@codelab/frontend/abstract/types'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  Form,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { PropMapBindingFragment } from '../../../graphql'
import { usePropMapBindingState } from '../../../hooks'

export type DeletePropMapBindingFormProps = Omit<
  FormProps<EmptyJsonSchemaType>,
  'schema'
>

export interface ElementId {
  elementId: string
}

export const DeletePropMapBindingForm = (
  props: DeleteUseCaseFormWithRef<EmptyJsonSchemaType, PropMapBindingFragment>,
) => {
  return (
    <Form<EmptyJsonSchemaType>
      model={props.model}
      onSubmit={props.onSubmit}
      onSubmitError={props.onSubmitError}
      onSubmitSuccess={props.onSubmitSuccess}
      schema={emptyJsonSchema}
      submitRef={props.submitRef}
    >
      <h4>
        Are you sure you want to delete the prop map binding "
        {props.entity?.sourceKey} - {props.entity?.targetKey}"?
      </h4>
      <AutoFields />
    </Form>
  )
}
