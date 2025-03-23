import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetBaseTypesDocument, GetTypesDocument, GetDescendantsDocument, GetPrimitiveTypesDocument, GetArrayTypesDocument, GetUnionTypesDocument, GetInterfaceTypesDocument, GetElementTypesDocument, GetRenderPropTypesDocument, GetReactNodeTypesDocument, GetRichTextTypesDocument, GetEnumTypesDocument, GetLambdaTypesDocument, GetPageTypesDocument, GetAppTypesDocument, GetActionTypesDocument, GetCodeMirrorTypesDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	GetBaseTypes: (variables: Types.GetBaseTypesQueryVariables) => gqlRequest(client, GetBaseTypesDocument.toString(), variables),
	GetTypes: (variables: Types.GetTypesQueryVariables) => gqlRequest(client, GetTypesDocument.toString(), variables),
	GetDescendants: (variables: Types.GetDescendantsQueryVariables) => gqlRequest(client, GetDescendantsDocument.toString(), variables),
	GetPrimitiveTypes: (variables: Types.GetPrimitiveTypesQueryVariables) => gqlRequest(client, GetPrimitiveTypesDocument.toString(), variables),
	GetArrayTypes: (variables: Types.GetArrayTypesQueryVariables) => gqlRequest(client, GetArrayTypesDocument.toString(), variables),
	GetUnionTypes: (variables: Types.GetUnionTypesQueryVariables) => gqlRequest(client, GetUnionTypesDocument.toString(), variables),
	GetInterfaceTypes: (variables: Types.GetInterfaceTypesQueryVariables) => gqlRequest(client, GetInterfaceTypesDocument.toString(), variables),
	GetElementTypes: (variables: Types.GetElementTypesQueryVariables) => gqlRequest(client, GetElementTypesDocument.toString(), variables),
	GetRenderPropTypes: (variables: Types.GetRenderPropTypesQueryVariables) => gqlRequest(client, GetRenderPropTypesDocument.toString(), variables),
	GetReactNodeTypes: (variables: Types.GetReactNodeTypesQueryVariables) => gqlRequest(client, GetReactNodeTypesDocument.toString(), variables),
	GetRichTextTypes: (variables: Types.GetRichTextTypesQueryVariables) => gqlRequest(client, GetRichTextTypesDocument.toString(), variables),
	GetEnumTypes: (variables: Types.GetEnumTypesQueryVariables) => gqlRequest(client, GetEnumTypesDocument.toString(), variables),
	GetLambdaTypes: (variables: Types.GetLambdaTypesQueryVariables) => gqlRequest(client, GetLambdaTypesDocument.toString(), variables),
	GetPageTypes: (variables: Types.GetPageTypesQueryVariables) => gqlRequest(client, GetPageTypesDocument.toString(), variables),
	GetAppTypes: (variables: Types.GetAppTypesQueryVariables) => gqlRequest(client, GetAppTypesDocument.toString(), variables),
	GetActionTypes: (variables: Types.GetActionTypesQueryVariables) => gqlRequest(client, GetActionTypesDocument.toString(), variables),
	GetCodeMirrorTypes: (variables: Types.GetCodeMirrorTypesQueryVariables) => gqlRequest(client, GetCodeMirrorTypesDocument.toString(), variables)
})
