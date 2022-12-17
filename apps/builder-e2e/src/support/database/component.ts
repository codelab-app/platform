import type { IComponentDTO } from '@codelab/frontend/abstract/core'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateComponentsDocument } from 'libs/frontend/domain/component/src/graphql/component.endpoints.graphql.gen'
import type { ArrayOrSingle } from 'ts-essentials'

export const createComponent = (input: ArrayOrSingle<ComponentCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreateComponentsDocument),
      variables: { input },
    })
    .then(
      (result) => result.body.data?.createComponents as Array<IComponentDTO>,
    )
