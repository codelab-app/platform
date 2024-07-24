'use server'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { CreateComponentsMutationVariables } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { componentApi } from './component.api'

export const createComponentRepository = async (component: IComponentModel) =>
  await componentApi.CreateComponents({ input: component.toCreateInput() })
