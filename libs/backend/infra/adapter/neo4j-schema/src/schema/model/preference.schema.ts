import { gql } from '@apollo/client'

import { authOwnerOrAdmin } from './user.schema'

export const preferenceSchema = gql`
  enum BreakpointType {
    Desktop
    MobilePortrait
    MobileLandscape
    Tablet
  }

  type Preference implements WithOwner ${authOwnerOrAdmin} @node {
    id: ID! @unique @settable(onUpdate: false)
    builderBreakpointType: BreakpointType!
    builderWidth: Float!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`
