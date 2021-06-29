import {
  PageElementFragment,
  refetchGetPageQuery,
  UpdatePageElementData,
  useGetAtomsQuery,
  useUpdatePageElementMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  FormUniforms,
  StatelessLoadingIndicator,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import React, { useContext, useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { PageContext } from '../../providers'
import { updatePageElementSchema } from './updatePageElementSchema'

type UpdatePageElementFormProps = UniFormUseCaseProps<UpdatePageElementData> & {
  pageElement: Pick<PageElementFragment, 'id' | 'name' | 'atom'>
}

/** Not intended to be used in a modal */
export const UpdatePageElementForm = ({
  pageElement: initialPageElement,
  ...props
}: UpdatePageElementFormProps) => {
  const { pageId } = useContext(PageContext)
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: pageElement } = useRef(initialPageElement)
  const { data: atoms } = useGetAtomsQuery()

  const [mutate, { loading: updating, error, data }] =
    useUpdatePageElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: [
        refetchGetPageQuery({ input: { pageId: pageId as string } }),
      ],
    })

  if (!pageElement) {
    return null
  }

  const onSubmit = (submitData: UpdatePageElementData) => {
    return mutate({
      variables: {
        input: { pageElementId: pageElement.id, updateData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<UpdatePageElementData>
        key={pageElement.id}
        autosave={true}
        autosaveDelay={500}
        schema={updatePageElementSchema}
        model={{
          atomId: pageElement.atom?.id,
          name: pageElement.name,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating page element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['atomId']} />

        <SelectField
          name="atomId"
          label="Atom"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          options={atoms?.atoms.map((atom) => ({
            label: atom.type,
            value: atom.id,
          }))}
        />
      </FormUniforms>

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: updating,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
