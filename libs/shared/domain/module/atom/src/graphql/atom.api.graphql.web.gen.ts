import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateAtomsDocument, DeleteAtomsDocument, AtomListDocument, GetSelectAtomOptionsDocument, UpdateAtomsDocument } from '@codelab/shared/infra/gqlgen'



export const CreateAtoms = (variables: Types.CreateAtomsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateAtomsDocument.toString(), variables, next)
export const DeleteAtoms = (variables: Types.DeleteAtomsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteAtomsDocument.toString(), variables, next)
export const AtomList = (variables: Types.AtomListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(AtomListDocument.toString(), variables, next)
export const GetSelectAtomOptions = (variables: Types.GetSelectAtomOptionsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)
export const UpdateAtoms = (variables: Types.UpdateAtomsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateAtomsDocument.toString(), variables, next)