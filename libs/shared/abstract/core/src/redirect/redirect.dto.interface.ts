import { type Static, Type } from '@sinclair/typebox'
import { IPageRedirectDTO } from './page-redirect.dto.interface'
import { IUrlRedirectDTO } from './url-redirect.dto.interface'

export const IRedirectDTO = Type.Union([IPageRedirectDTO, IUrlRedirectDTO])

export type IRedirectDTO = Static<typeof IRedirectDTO>
