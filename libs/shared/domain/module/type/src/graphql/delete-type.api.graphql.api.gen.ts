import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { DeletePrimitiveTypesDocument, DeleteArrayTypesDocument, DeleteReactNodeTypesDocument, DeleteUnionTypesDocument, DeleteInterfaceTypesDocument, DeleteElementTypesDocument, DeleteRenderPropTypesDocument, DeleteRichTextTypesDocument, DeleteEnumTypesDocument, DeleteLambdaTypesDocument, DeletePageTypesDocument, DeleteAppTypesDocument, DeleteActionTypesDocument, DeleteCodeMirrorTypesDocument } from './delete-type.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	DeletePrimitiveTypes : (variables: Types.DeletePrimitiveTypesMutationVariables) => gqlRequest(client, DeletePrimitiveTypesDocument.toString(), variables),
	DeleteArrayTypes : (variables: Types.DeleteArrayTypesMutationVariables) => gqlRequest(client, DeleteArrayTypesDocument.toString(), variables),
	DeleteReactNodeTypes : (variables: Types.DeleteReactNodeTypesMutationVariables) => gqlRequest(client, DeleteReactNodeTypesDocument.toString(), variables),
	DeleteUnionTypes : (variables: Types.DeleteUnionTypesMutationVariables) => gqlRequest(client, DeleteUnionTypesDocument.toString(), variables),
	DeleteInterfaceTypes : (variables: Types.DeleteInterfaceTypesMutationVariables) => gqlRequest(client, DeleteInterfaceTypesDocument.toString(), variables),
	DeleteElementTypes : (variables: Types.DeleteElementTypesMutationVariables) => gqlRequest(client, DeleteElementTypesDocument.toString(), variables),
	DeleteRenderPropTypes : (variables: Types.DeleteRenderPropTypesMutationVariables) => gqlRequest(client, DeleteRenderPropTypesDocument.toString(), variables),
	DeleteRichTextTypes : (variables: Types.DeleteRichTextTypesMutationVariables) => gqlRequest(client, DeleteRichTextTypesDocument.toString(), variables),
	DeleteEnumTypes : (variables: Types.DeleteEnumTypesMutationVariables) => gqlRequest(client, DeleteEnumTypesDocument.toString(), variables),
	DeleteLambdaTypes : (variables: Types.DeleteLambdaTypesMutationVariables) => gqlRequest(client, DeleteLambdaTypesDocument.toString(), variables),
	DeletePageTypes : (variables: Types.DeletePageTypesMutationVariables) => gqlRequest(client, DeletePageTypesDocument.toString(), variables),
	DeleteAppTypes : (variables: Types.DeleteAppTypesMutationVariables) => gqlRequest(client, DeleteAppTypesDocument.toString(), variables),
	DeleteActionTypes : (variables: Types.DeleteActionTypesMutationVariables) => gqlRequest(client, DeleteActionTypesDocument.toString(), variables),
	DeleteCodeMirrorTypes : (variables: Types.DeleteCodeMirrorTypesMutationVariables) => gqlRequest(client, DeleteCodeMirrorTypesDocument.toString(), variables)
})