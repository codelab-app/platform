'use server'

import type { IAppService } from '@codelab/frontend/abstract/application'
import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { graphql } from '@codelab/frontend/infra/gql'
import { getMutationOptions } from '@codelab/frontend/infra/graphql'
import { useMutation } from '@tanstack/react-query'

export const createApp =
  (appService: IAppService) => (appDto: ICreateAppData) => {
    return appService.create(appDto)
  }

export const CreateApp_mutation = graphql(`
  mutation CreateApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`)

const useCreateApp = (appDto: ICreateAppData) => {
  useMutation({
    ...getMutationOptions(CreateApp_mutation, {}),
  })
}
