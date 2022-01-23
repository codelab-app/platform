import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
  SelectElementProvider,
} from '@codelab/frontend/modules/type'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateElementInput } from '@codelab/shared/abstract/codegen'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useElementDispatch } from '../../../hooks'
import { useElementGraphContext } from '../../../providers'
import { createElementSchema } from './createElementSchema'
import { useCreateElementForm } from './useCreateElementForm'

/**
 * Initial data used to determine the parent element
 * @param initialData
 * @constructor
 */
export const CreateElementModal = ({
  parentElementId,
}: Pick<CreateElementInput, 'parentElementId'>) => {
  const { resetModal } = useElementDispatch()
  const { elementTree } = useElementGraphContext()

  const { onSubmit, actionType, onSubmitSuccess, onSubmitError, isLoading } =
    useCreateElementForm({ parentElementId })

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Create"
      onCancel={() => resetModal()}
      title={<span css={tw`font-semibold`}>Create element</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <SelectElementProvider
          tree={elementTree ?? new ElementTree({ edges: [], vertices: [] })}
        >
          <Form<CreateElementInput>
            model={{}}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            onSubmitSuccess={onSubmitSuccess}
            schema={createElementSchema}
            submitRef={submitRef}
          >
            <AutoFields
              omitFields={[
                'parentElementId',
                'atomId',
                'instanceOfComponentId',
                'order',
              ]}
            />
            <AutoField component={SelectAnyElement} name="parentElementId" />
            <AutoField name="order" />
            <AutoField component={SelectAtom} name="atomId" />
            <AutoField
              component={SelectComponent}
              name="instanceOfComponentId"
            />
          </Form>
        </SelectElementProvider>
      )}
    </FormModal>
  )
}
