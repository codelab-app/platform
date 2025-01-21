import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
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
} from '@codelab/shared/infra/gqlgen'

import { type GetComponentBuilderQueryVariables } from '@codelab/shared/infra/gqlgen'
import { GetComponentBuilderDocument } from './component-builder.api.graphql.docs.gen'

export const GetComponentBuilder = (
  variables: GetComponentBuilderQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetComponentBuilderDocument.toString(), variables, next)
