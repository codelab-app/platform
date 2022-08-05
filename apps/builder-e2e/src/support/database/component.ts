import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { IComponentDTO } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import { CreateComponentsDocument } from '../../../../../libs/frontend/modules/component/src/graphql/component.endpoints.graphql.gen'

export const createComponent = (input: MaybeArray<ComponentCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreateComponentsDocument),
      variables: { input },
    })
    .then(
      (result) => result.body.data?.createComponents as Array<IComponentDTO>,
    )
