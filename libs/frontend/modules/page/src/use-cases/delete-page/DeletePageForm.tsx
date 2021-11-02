import { AppContext } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  GetPagesGql,
  GetPagesQuery,
  GetPagesQueryVariables,
} from '../get-pages/GetPages.web.graphql.gen'
import { useDeletePageMutation } from './DeletePage.web.graphql.gen'

type DeletePageFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { app } = useContext(AppContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Page,
    useMutationFunction: useDeletePageMutation,
    mutationOptions: {
      // refetchQueries: [
      //   refetchGetPagesQuery({ input: { byApp: { appId: app.id } } }),
      // ],
      update: (cache, { data }: any) => {
        const deletedPage = data?.deletePage

        console.log('deletedPage', data)

        const variables = {
          input: {
            byApp: {
              appId: app.id,
            },
          },
        }

        const existingPages = cache.readQuery<
          GetPagesQuery,
          GetPagesQueryVariables
        >({
          query: GetPagesGql,
          variables,
        })

        if (existingPages && deletedPage) {
          cache.writeQuery<GetPagesQuery, GetPagesQueryVariables>({
            query: GetPagesGql,
            variables,
            data: {
              pages: [
                ...existingPages.pages.filter(
                  (page) => page.id !== deletedPage?.id,
                ),
              ],
            },
          })
        }
      },
    },
    mapVariables: (_, state) => ({ input: { pageId: state.deleteIds[0] } }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
