import { ComponentCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { IComponent } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'
import { print } from 'graphql'
import { E2eCreateComponentDocument } from './graphql/component.api.v2.1.graphql.gen'

export const createComponent = (input: MaybeArray<ComponentCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateComponentDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createComponents as Array<IComponent>)
