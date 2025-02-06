import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateAtomsDocument, DeleteAtomsDocument, AtomListDocument, GetSelectAtomOptionsDocument, UpdateAtomsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateAtoms = (variables: Types.CreateAtomsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateAtomsDocument.toString(), variables, next)
export const DeleteAtoms = (variables: Types.DeleteAtomsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteAtomsDocument.toString(), variables, next)
export const AtomList = (variables: Types.AtomListQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(AtomListDocument.toString(), variables, next)
export const GetSelectAtomOptions = (variables: Types.GetSelectAtomOptionsQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(GetSelectAtomOptionsDocument.toString(), variables, next)
export const UpdateAtoms = (variables: Types.UpdateAtomsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateAtomsDocument.toString(), variables, next)
