import { IAtomDTO } from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IApiOutputDto } from './api.output.dto'

/**
 * This is the single file that we export. We'll read all the single files and aggregate them into `IAdminData`
 */
export const IAtomOutputDto = Type.Object({
  api: IApiOutputDto,
  atom: Typebox.OmitOwner(IAtomDTO),
})

export type IAtomOutputDto = Static<typeof IAtomOutputDto>
