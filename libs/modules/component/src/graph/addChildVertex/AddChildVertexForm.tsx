import { PropsWithIds } from '@codelab/frontend/shared'

export type AddChildVertexFormProps = {
  // vertex: VertexFragmentsFragment
  vertex: any
  parentVertexId: string
}

export const AddChildVertexForm = ({
  pageId,
  vertex,
  parentVertexId,
  ...props
}: AddChildVertexFormProps & PropsWithIds<'pageId'>) => {
  // const [mutate] = useAddChildVertexMutation({
  //   refetchQueries: [
  //     {
  //       query: GetPageGql,
  //       variables: {
  //         input: {
  //           pageId,
  //         },
  //       },
  //     },
  //   ],
  // })

  return null
  // return (
  //   <ApolloForm<AddChildVertexInput, UpdateVertexMutationVariables>
  //     hideSubmitButton
  //     mutate={mutate}
  //     schema={AddChildVertexInputSchema}
  //     initialFormData={{
  //       parentVertexId,
  //       vertex: { type: '', props: {} },
  //     }}
  //     uiSchema={{
  //       parentVertexId: {
  //         'ui:disabled': 'parentVertexId',
  //       },
  //     }}
  //     idPrefix="add_child_vertex"
  //     {...props}
  //   />
  // )
}
