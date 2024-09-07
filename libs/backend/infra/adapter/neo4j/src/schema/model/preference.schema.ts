import { gql } from '@apollo/client'
import { authOwnerOrAdmin } from './user.schema'

export const preferenceSchema = gql`
  enum Breakpoint {
    Desktop
    MobilePortrait
    MobileLandscape
    Tablet
    None
  }


  type Preference implements WithOwner ${authOwnerOrAdmin}{
    id: ID! @unique
    builderBreakpoint: Breakpoint!
    builderWidth: Float!
    owner: User!
  }
`
