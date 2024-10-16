import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
import { GetComponentBuilderDocument } from './component-builder.api.documents.graphql.gen'

export const GetComponentBuilder = (
  variables: GetComponentBuilderQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetComponentBuilderDocument.toString(), variables, next)
