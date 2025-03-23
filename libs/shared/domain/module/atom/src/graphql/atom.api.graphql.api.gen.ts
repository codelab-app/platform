import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateAtomsDocument, DeleteAtomsDocument, AtomListDocument, GetSelectAtomOptionsDocument, UpdateAtomsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateAtoms: (variables: Types.CreateAtomsMutationVariables) => gqlRequest(client, CreateAtomsDocument.toString(), variables),
	DeleteAtoms: (variables: Types.DeleteAtomsMutationVariables) => gqlRequest(client, DeleteAtomsDocument.toString(), variables),
	AtomList: (variables: Types.AtomListQueryVariables) => gqlRequest(client, AtomListDocument.toString(), variables),
	GetSelectAtomOptions: (variables: Types.GetSelectAtomOptionsQueryVariables) => gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables),
	UpdateAtoms: (variables: Types.UpdateAtomsMutationVariables) => gqlRequest(client, UpdateAtomsDocument.toString(), variables)
})
