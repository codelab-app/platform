import { DashboardLayout } from '@codelab/frontend-presentation-view/templates'

const Layout = async ({
  children,
  header,
  modal,
}: {
  children: React.ReactNode
  header: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <DashboardLayout<never, never> params={Promise.resolve({})}>
      {children}
    </DashboardLayout>
  )
}

export default Layout
