import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen-v2'
import { IElement } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import {
  E2eCreateElementDocument,
  E2eUpdateElementDocument,
} from './graphql/element.api.v2.1.graphql.gen'

export const createElement = (input: ElementCreateInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateElementDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createElements as Array<IElement>)

export const updateElement = (input: ElementUpdateInput) =>
  cy
    .graphqlRequest({
      query: print(E2eUpdateElementDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.updateElements as Array<IElement>)
