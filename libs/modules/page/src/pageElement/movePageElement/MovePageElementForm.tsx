import {
  PageElementFragment,
  refetchGetPageQuery,
  useGetAtomsQuery,
  useMovePageElementMutation,
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
import {
  movePageElementSchema,
  MovePageElementSchemaType,
} from './movePageElementSchema'

type MovePageElementFormProps =
  UniFormUseCaseProps<MovePageElementSchemaType> & {
    pageElement: Pick<PageElementFragment, 'id' | 'name' | 'atom'>
  }

/** Not intended to be used in a modal */
export const MovePageElementForm = ({
  pageElement: initialPageElement,
  ...props
}: MovePageElementFormProps) => {
  const { cytoscapeRoot, pageId, page } = useContext(PageContext)
  // Cache it only once, don't pass it with every change to the form, because that will cause lag when autosaving
  const { current: pageElement } = useRef(initialPageElement)
  const { data: atoms } = useGetAtomsQuery()

  if (!page || !pageId) {
    throw new Error(
      "Can't load MovePageElementForm. No page or pageId provided",
    )
  }

  const [mutate, { loading: loadingMutation, error, data }] =
    useMovePageElementMutation({
      awaitRefetchQueries: true,
      refetchQueries: [refetchGetPageQuery({ input: { pageId: pageId } })],
    })

  if (!pageElement) {
    return null
  }

  const selectedElementsEdge = cytoscapeRoot
    ?.$id(pageElement.id)
    .connectedEdges()
    .map((e) => e.data())
    .find((d) => d.target === pageElement.id)

  const pageElementOptions = [
    { label: page.rootElement.name, value: page.rootElement.id },
    ...page.rootElement.descendants.map((element) => ({
      label: element.name,
      value: element.id,
    })),
  ]

  const onSubmit = (submitData: MovePageElementSchemaType) => {
    return mutate({
      variables: {
        input: { pageElementId: pageElement.id, moveData: { ...submitData } },
      },
    })
  }

  return (
    <>
      <FormUniforms<MovePageElementSchemaType>
        key={pageElement.id}
        autosave={true}
        autosaveDelay={500}
        schema={movePageElementSchema}
        model={{
          parentElementId: selectedElementsEdge?.source,
          order: selectedElementsEdge?.order,
        }}
        onSubmitError={createNotificationHandler({
          title: 'Error while moving page element',
        })}
        onSubmit={onSubmit}
        {...props}
      >
        <AutoFields omitFields={['parentElementId']} />

        <SelectField
          name="parentElementId"
          label="Parent element"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/vazco/uniforms/issues/951
          showSearch={true}
          optionFilterProp="label"
          options={pageElementOptions}
        />
      </FormUniforms>

      <StatelessLoadingIndicator
        style={{ display: 'block', margin: '0.5rem' }}
        state={{
          isLoading: loadingMutation,
          isErrored: Boolean(
            error || (data as any)?.errors || (data as any)?.error,
          ),
        }}
      />
    </>
  )
}
