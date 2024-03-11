import { AtomType } from '@codelab/shared/abstract/codegen'
import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { IPropData } from '../prop/prop.dto.interface'

/**
 * This allows for a shortened object to be specified as input. Good for seeding data in cases where the input is manually specified (such as Cypress)
 */
export const ICreateElementData = Type.Object({
  /**
   * We have renderType here
   */
  // Can't use `IAtomType` due to circular import issue
  atom: Type.Optional(Type.Enum(AtomType)),
  // Name of the Component
  component: Type.Optional(Type.String()),
  id: Type.String(),
  name: Type.String(),
  parentElement: Type.Optional(Typebox.Ref()),
  prevSibling: Type.Optional(Typebox.Ref()),
  propsData: Type.Optional(Type.Object<IPropData>({})),
  // atom?: IAtomType
  // id: string
  // name: string
  // parentElement: IRef
  // propsData?: Record<string, unknown> & { name?: string; label?: string }
})

export type ICreateElementData = Static<typeof ICreateElementData>
