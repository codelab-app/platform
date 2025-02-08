import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateComponentsDocument, DeleteComponentsDocument, UpdateComponentsDocument, ComponentListDocument } from '@codelab/shared/infra/gqlgen'

export const CreateComponents = (variables: Types.CreateComponentsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateComponentsDocument.toString(), variables, next)
export const DeleteComponents = (variables: Types.DeleteComponentsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteComponentsDocument.toString(), variables, next)
export const UpdateComponents = (variables: Types.UpdateComponentsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateComponentsDocument.toString(), variables, next)
export const ComponentList = (variables: Types.ComponentListQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(ComponentListDocument.toString(), variables, next)
