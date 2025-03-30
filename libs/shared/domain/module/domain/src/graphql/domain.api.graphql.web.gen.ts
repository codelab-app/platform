import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DomainListDocument, CreateDomainsDocument, UpdateDomainsDocument, DeleteDomainsDocument } from '@codelab/shared/infra/gqlgen'

export const DomainList = (variables: Types.DomainListQueryVariables, next?: NextFetchOptions) => gqlServerRequest(DomainListDocument.toString(), variables, next)
export const CreateDomains = (variables: Types.CreateDomainsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateDomainsDocument.toString(), variables, next)
export const UpdateDomains = (variables: Types.UpdateDomainsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdateDomainsDocument.toString(), variables, next)
export const DeleteDomains = (variables: Types.DeleteDomainsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteDomainsDocument.toString(), variables, next)
