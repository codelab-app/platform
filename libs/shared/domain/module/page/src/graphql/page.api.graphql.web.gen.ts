import * as Types from '@codelab/shared-infra-gqlgen';

import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import { gqlServerRequest } from '@codelab/shared-infra-fetch-server'
import { CreatePagesDocument, DeletePagesDocument, UpdatePagesDocument, PageListDocument, GetRenderedPageDocument } from '@codelab/shared-infra-gqlgen'

export const CreatePages = (variables: Types.CreatePagesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreatePagesDocument.toString(), variables, next)
export const DeletePages = (variables: Types.DeletePagesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeletePagesDocument.toString(), variables, next)
export const UpdatePages = (variables: Types.UpdatePagesMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdatePagesDocument.toString(), variables, next)
export const PageList = (variables: Types.PageListQueryVariables, next?: NextFetchOptions) => gqlServerRequest(PageListDocument.toString(), variables, next)
export const GetRenderedPage = (variables: Types.GetRenderedPageQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetRenderedPageDocument.toString(), variables, next)
