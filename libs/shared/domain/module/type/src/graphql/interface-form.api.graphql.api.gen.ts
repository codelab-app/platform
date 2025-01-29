import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { InterfaceForm_GetAppsDocument, InterfaceForm_GetAtomsDocument, InterfaceForm_GetActionsDocument, InterfaceForm_GetStoresDocument, InterfaceForm_GetResourceDocument, InterfaceForm_GetPagesDocument } from './interface-form.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	InterfaceForm_GetApps : (variables: Types.InterfaceForm_GetAppsQueryVariables) => gqlRequest(client, InterfaceForm_GetAppsDocument.toString(), variables),
	InterfaceForm_GetAtoms : (variables: Types.InterfaceForm_GetAtomsQueryVariables) => gqlRequest(client, InterfaceForm_GetAtomsDocument.toString(), variables),
	InterfaceForm_GetActions : (variables: Types.InterfaceForm_GetActionsQueryVariables) => gqlRequest(client, InterfaceForm_GetActionsDocument.toString(), variables),
	InterfaceForm_GetStores : (variables: Types.InterfaceForm_GetStoresQueryVariables) => gqlRequest(client, InterfaceForm_GetStoresDocument.toString(), variables),
	InterfaceForm_GetResource : (variables: Types.InterfaceForm_GetResourceQueryVariables) => gqlRequest(client, InterfaceForm_GetResourceDocument.toString(), variables),
	InterfaceForm_GetPages : (variables: Types.InterfaceForm_GetPagesQueryVariables) => gqlRequest(client, InterfaceForm_GetPagesDocument.toString(), variables)
})