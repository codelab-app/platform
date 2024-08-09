import { AtomType } from '@codelab/shared/infra/gql'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { Overwrite } from 'utility-types'
import type { IPropData } from '../prop/prop.dto.interface'

/**
 * This allows for a shortened object to be specified as input. Good for seeding data in cases where the input is manually specified (such as Cypress)
 */
export const CreateElementDataSchema = Type.Object({
  /**
   * We have renderType here
   */
  // Can't use `IAtomType` due to circular import issue
  atom: Type.Optional(Type.Enum(AtomType)),
  childMapperComponent: Typebox.Nullish(Typebox.Ref),
  childMapperPreviousSibling: Typebox.Nullish(Typebox.Ref),
  childMapperPropKey: Typebox.Nullish(Type.String()),
  // Name of the Component
  component: Type.Optional(Type.String()),
  id: Type.String(),
  name: Type.String(),
  page: Type.Optional(Typebox.Ref),
  parentComponent: Type.Optional(Typebox.Ref),
  parentElement: Type.Optional(Typebox.Ref),
  postRenderAction: Typebox.Nullish(Typebox.Ref),
  preRenderAction: Typebox.Nullish(Typebox.Ref),
  prevSibling: Type.Optional(Typebox.Ref),
  propsData: Type.Optional(Type.Object<IPropData>({})),
  // atom?: IAtomType
  // id: string
  // name: string
  // parentElement: IRef
})

export type ICreateElementData = Static<typeof CreateElementDataSchema>

/**
 * Cypress uses parent element label for the Ui
 */
export type ICreateCypressElementData = Overwrite<
  Omit<ICreateElementData, 'id'>,
  { parentElement: string }
>
