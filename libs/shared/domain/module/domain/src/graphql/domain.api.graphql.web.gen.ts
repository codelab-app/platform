import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DomainListDocument, CreateDomainsDocument, UpdateDomainsDocument, DeleteDomainsDocument } from './domain.api.graphql.docs.gen'


export const DomainList = (variables: Types.DomainListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DomainListDocument.toString(), variables, next)
export const CreateDomains = (variables: Types.CreateDomainsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateDomainsDocument.toString(), variables, next)
export const UpdateDomains = (variables: Types.UpdateDomainsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateDomainsDocument.toString(), variables, next)
export const DeleteDomains = (variables: Types.DeleteDomainsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteDomainsDocument.toString(), variables, next)