import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import {
  ActionTypeFragmentDoc,
  AtomBuilderFragmentDoc,
  AtomProductionFragmentDoc,
  CodeMirrorTypeFragmentDoc,
  ComponentBuilderFragmentDoc,
  PrimitiveTypeFragmentDoc,
  ReactNodeTypeFragmentDoc,
  RenderPropTypeFragmentDoc,
  RichTextTypeFragmentDoc,
  ResourceFragmentDoc,
} from '@codelab/shared/infra/gql'

import { type GetComponentBuilderQueryVariables } from '@codelab/shared/infra/gql'
import { GetComponentBuilderDocument } from './component-builder.api.graphql.docs.gen'

export const getSdk = () => ({
  GetComponentBuilder: (variables: GetComponentBuilderQueryVariables) =>
    gqlRequest(GetComponentBuilderDocument.toString(), variables),
})
