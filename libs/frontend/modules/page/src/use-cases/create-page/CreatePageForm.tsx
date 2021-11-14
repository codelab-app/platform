import { AppContext } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCreatePageMutation } from '../../store/pageEndpoints'
import { createPageSchema, CreatePageSchemaType } from './createPageSchema'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageSchemaType>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { app } = useContext(AppContext)

  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    entityType: EntityType.Page,
    useMutationFunction: useCreatePageMutation,
    mutationOptions: {
      // refetchQueries: [
      //   refetchGetPagesQuery({ input: { byApp: { appId: app.id } } }),
      // ],
      /*      
      update: (cache, { data }: any) => {
        const newPage = data?.createPage

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

        if (existingPages && newPage) {
          cache.writeQuery<GetPagesQuery, GetPagesQueryVariables>({
            query: GetPagesGql,
            variables,
            data: {
              pages: [...existingPages.pages, newPage],
            },
          })
        }
      },
 */
    },
    mapVariables: (submitData: CreatePageSchemaType) => ({
      input: { ...submitData, appId: app.id },
    }),
  })

  return (
    <FormUniforms<CreatePageSchemaType>
      onSubmit={handleSubmit}
      schema={createPageSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page',
      })}
      onSubmitSuccess={() => {
        reset()
      }}
      {...props}
    >
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
