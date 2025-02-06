import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ResourceListDocument, CreateResourcesDocument, UpdateResourcesDocument, DeleteResourcesDocument } from '@codelab/shared/infra/gqlgen'

export const ResourceList = (variables: Types.ResourceListQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(ResourceListDocument.toString(), variables, next)
export const CreateResources = (variables: Types.CreateResourcesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateResourcesDocument.toString(), variables, next)
export const UpdateResources = (variables: Types.UpdateResourcesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateResourcesDocument.toString(), variables, next)
export const DeleteResources = (variables: Types.DeleteResourcesMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteResourcesDocument.toString(), variables, next)
