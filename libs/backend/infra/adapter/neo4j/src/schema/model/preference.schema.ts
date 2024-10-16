import { gql } from '@apollo/client'

import { authOwnerOrAdmin } from './user.schema'

export const preferenceSchema = gql`
  enum BreakpointType {
    Desktop
    MobilePortrait
    MobileLandscape
    Tablet
  }


  type Preference implements WithOwner ${authOwnerOrAdmin}{
    id: ID! @unique
    builderBreakpointType: BreakpointType!
    builderWidth: Float!
    owner: User!
  }
`
