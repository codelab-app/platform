import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
  SelectElementProvider,
} from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  notify,
} from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useElementGraphContext } from '../../providers'
import { refetchGetElementGraphQuery } from '../get-element-graph'
import { useCreateElementMutation } from './CreateElement.web.graphql.gen'
import { CreateElementSchema, createElementSchema } from './createElementSchema'

export interface CreateElementFormProps
  extends UniFormUseCaseProps<CreateElementSchema> {
  initialData: Partial<Pick<CreateElementSchema, 'parentElementId'>> | undefined
}

export const CreateElementForm = ({
  initialData,
  ...props
}: CreateElementFormProps) => {
  const initialDataRef = useRef(initialData)
  const { elementId, elementTree } = useElementGraphContext()

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Element,
    mutationOptions: {
      refetchQueries: [
        refetchGetElementGraphQuery({ input: { where: { id: elementId } } }),
      ],
    },
    useMutationFunction: useCreateElementMutation,
    mapVariables: ({ componentId, ...formData }: CreateElementSchema) => {
      if (formData.atomId && componentId) {
        notify({
          title: 'Set either atom or component, not both',
          type: 'error',
        })
        throw new Error('Set either atom or component, not both')
      }

      return {
        input: {
          ...formData,
          childrenIds: componentId ? [componentId] : undefined,
        },
      }
    },
  })

  return (
    <SelectElementProvider
      tree={elementTree ?? new ElementTree({ edges: [], vertices: [] })}
    >
      <FormUniforms<CreateElementSchema>
        schema={createElementSchema}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating element',
        })}
        onSubmit={handleSubmit}
        onSubmitSuccess={() => reset()}
        model={{
          parentElementId:
            initialDataRef.current?.parentElementId ??
            metadata?.parentElementId,
        }}
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
