import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch/use-server'
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

export const GetComponentBuilder = (
  variables: GetComponentBuilderQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetComponentBuilderDocument.toString(), variables, next)
