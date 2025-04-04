import { gql } from '@apollo/client'

import { authOwnerOrAdmin } from './user.schema'

export const preferenceSchema = gql`

  enum BreakpointType {
    Desktop
    MobilePortrait
    MobileLandscape
    Tablet
  }

  enum ConfigPaneTab {
    Component
    CSS
    Node
    Page
    Props
    PropsInspector
    PropsMap
    PropsTransformation
  }

  type Preference implements WithOwner ${authOwnerOrAdmin} @node {
    id: ID!  @settable(onUpdate: false) #@unique
    builderBreakpointType: BreakpointType!
    builderWidth: Float!
    activeConfigPaneTab: ConfigPaneTab!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`
