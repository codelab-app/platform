import type { Static } from '@sinclair/typebox'
import type { Overwrite } from 'utility-types'

import { AtomType } from '@codelab/shared/infra/gql'
import { Type } from '@sinclair/typebox'

import type { IPropData } from '../prop/prop.dto.interface'

import { ElementDtoSchema } from './element.dto.interface'

/**
 * This allows for a shortened object to be specified as input. Good for seeding data in cases where the input is manually specified (such as Cypress)
 */
export const CreateElementDataSchema = Type.Composite([
  Type.Object({
    /**
     * We have renderType here
     */
    // Can't use `IAtomType` due to circular import issue
    atom: Type.Optional(Type.Enum(AtomType)),
    // Name of the Component
    component: Type.Optional(Type.String()),
    propsData: Type.Optional(Type.Object<IPropData>({})),
  }),
  Type.Pick(ElementDtoSchema, [
    'childMapperComponent',
    'childMapperPreviousSibling',
    'childMapperPropKey',
    'id',
    'name',
    'page',
    'parentComponent',
    'parentElement',
    'postRenderActions',
    'preRenderActions',
    'prevSibling',
  ]),
])

export type ICreateElementData = Static<typeof CreateElementDataSchema>

/**
 * Cypress uses parent element label for the Ui
 */
export type ICreateCypressElementData = Overwrite<
  Omit<ICreateElementData, 'id'>,
  { parentElement: string; atom: string; propsData?: string }
>
