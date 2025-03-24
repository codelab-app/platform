import type { UrlParams } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'

import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

// const Layout = ({
//   children,
//   header,
//   primarySidebar,
//   secondaryPopover,
// }: {
//   children: ReactNode
//   header: ReactNode
//   primarySidebar: ReactNode
//   secondaryPopover: ReactNode
// }) => {
//   return (
//     <DashboardLayout<'header' | 'primarySidebar' | 'secondaryPopover'>
//       header={header}
//       params={Promise.resolve()}
//       primarySidebar={primarySidebar}
//       secondaryPopover={secondaryPopover}
//     >
//       {children}
//     </DashboardLayout>
//   )
// }

export default DashboardLayout
