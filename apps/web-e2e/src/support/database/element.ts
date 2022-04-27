import {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IElementDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import {
  CreateElementsDocument,
  UpdateElementsDocument,
} from '../../../../../libs/frontend/modules/element/src/graphql/element.endpoints.graphql.gen'

export const createElement = (input: ElementCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateElementsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createElements as Array<IElementDTO>)

export const updateElement = (input: ElementUpdateInput) =>
  cy
    .graphqlRequest({
      query: print(UpdateElementsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.updateElements as Array<IElementDTO>)
