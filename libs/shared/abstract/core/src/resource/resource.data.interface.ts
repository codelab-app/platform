import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { Overwrite } from 'utility-types'
import { IResourceDto } from './resource.dto.interface'
import { IResourceConfigData } from './resource-config'

export const ICreateResourceData = Typebox.Overwrite(
  IResourceDto,
  Type.Object({
    config: IResourceConfigData,
  }),
)

export type ICreateResourceData = Static<typeof ICreateResourceData>

export type IUpdateResourceData = ICreateResourceData
