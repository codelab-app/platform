import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { UpdatePrimitiveTypesDocument, UpdateArrayTypesDocument, UpdateUnionTypesDocument, UpdateInterfaceTypesDocument, UpdateReactNodeTypesDocument, UpdateElementTypesDocument, UpdateRenderPropTypesDocument, UpdateEnumTypesDocument, UpdateLambdaTypesDocument, UpdatePageTypesDocument, UpdateAppTypesDocument, UpdateRichTextTypesDocument, UpdateActionTypesDocument, UpdateCodeMirrorTypesDocument } from './update-type.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	UpdatePrimitiveTypes : (variables: Types.UpdatePrimitiveTypesMutationVariables) => gqlRequest(client, UpdatePrimitiveTypesDocument.toString(), variables),
	UpdateArrayTypes : (variables: Types.UpdateArrayTypesMutationVariables) => gqlRequest(client, UpdateArrayTypesDocument.toString(), variables),
	UpdateUnionTypes : (variables: Types.UpdateUnionTypesMutationVariables) => gqlRequest(client, UpdateUnionTypesDocument.toString(), variables),
	UpdateInterfaceTypes : (variables: Types.UpdateInterfaceTypesMutationVariables) => gqlRequest(client, UpdateInterfaceTypesDocument.toString(), variables),
	UpdateReactNodeTypes : (variables: Types.UpdateReactNodeTypesMutationVariables) => gqlRequest(client, UpdateReactNodeTypesDocument.toString(), variables),
	UpdateElementTypes : (variables: Types.UpdateElementTypesMutationVariables) => gqlRequest(client, UpdateElementTypesDocument.toString(), variables),
	UpdateRenderPropTypes : (variables: Types.UpdateRenderPropTypesMutationVariables) => gqlRequest(client, UpdateRenderPropTypesDocument.toString(), variables),
	UpdateEnumTypes : (variables: Types.UpdateEnumTypesMutationVariables) => gqlRequest(client, UpdateEnumTypesDocument.toString(), variables),
	UpdateLambdaTypes : (variables: Types.UpdateLambdaTypesMutationVariables) => gqlRequest(client, UpdateLambdaTypesDocument.toString(), variables),
	UpdatePageTypes : (variables: Types.UpdatePageTypesMutationVariables) => gqlRequest(client, UpdatePageTypesDocument.toString(), variables),
	UpdateAppTypes : (variables: Types.UpdateAppTypesMutationVariables) => gqlRequest(client, UpdateAppTypesDocument.toString(), variables),
	UpdateRichTextTypes : (variables: Types.UpdateRichTextTypesMutationVariables) => gqlRequest(client, UpdateRichTextTypesDocument.toString(), variables),
	UpdateActionTypes : (variables: Types.UpdateActionTypesMutationVariables) => gqlRequest(client, UpdateActionTypesDocument.toString(), variables),
	UpdateCodeMirrorTypes : (variables: Types.UpdateCodeMirrorTypesMutationVariables) => gqlRequest(client, UpdateCodeMirrorTypesDocument.toString(), variables)
})