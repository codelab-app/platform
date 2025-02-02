import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateAppsDocument, UpdateAppsDocument, DeleteAppsDocument, AppListPreviewDocument, AppListDocument, GetAppProductionDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateApps : (variables: Types.CreateAppsMutationVariables) => gqlRequest(client, CreateAppsDocument.toString(), variables),
	UpdateApps : (variables: Types.UpdateAppsMutationVariables) => gqlRequest(client, UpdateAppsDocument.toString(), variables),
	DeleteApps : (variables: Types.DeleteAppsMutationVariables) => gqlRequest(client, DeleteAppsDocument.toString(), variables),
	AppListPreview : (variables: Types.AppListPreviewQueryVariables) => gqlRequest(client, AppListPreviewDocument.toString(), variables),
	AppList : (variables: Types.AppListQueryVariables) => gqlRequest(client, AppListDocument.toString(), variables),
	GetAppProduction : (variables: Types.GetAppProductionQueryVariables) => gqlRequest(client, GetAppProductionDocument.toString(), variables)
})
