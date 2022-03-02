import { ComponentCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { IComponent } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { E2eCreateAppDocument } from '../graphql/app.api.v2.1.graphql.gen'

export const createComponent = (input: ComponentCreateInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateAppDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createComponents as Array<IComponent>)
}

Cypress.Commands.add('createComponent', createComponent)
