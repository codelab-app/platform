import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
  SelectElementProvider,
} from '@codelab/frontend/modules/type'
import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useElementGraphContext } from '../../../providers'
import { CreateElementSchema, createElementSchema } from './createElementSchema'

export type CreateElementFormProps = Omit<
  FormUniformsProps<CreateElementSchema>,
  'schema'
>

export const CreateElementForm = (props: CreateElementFormProps) => {
  const { elementTree } = useElementGraphContext()

  return (
    <SelectElementProvider
      tree={elementTree ?? new ElementTree({ edges: [], vertices: [] })}
    >
      <FormUniforms<CreateElementSchema>
        schema={createElementSchema}
        {...props}
      >
        <AutoFields
          omitFields={['parentElementId', 'atomId', 'componentId', 'order']}
        />
        <AutoField name="parentElementId" component={SelectAnyElement} />
        <AutoField name={'order'} />
        <AutoField name="atomId" component={SelectAtom} />
        <AutoField name="componentId" component={SelectComponent} />
      </FormUniforms>
    </SelectElementProvider>
  )
}
