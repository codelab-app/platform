import { useRouter } from 'next/router'
import { LayoutComponent } from '../Layout.interface'

export const LibraryTemplate: LayoutComponent<'builder'> = (props) => {
  const { children, MainPane } = props
  const { query } = useRouter()
  const componentId = query?.componentId as string

  return null
  // return (
  //   <LibraryProvider>
  //     <ComponentProvider componentId={componentId}>
  //       <EditorProvider>
  //         <DashboardLayout MainPane={MainPane} SidebarNavigation={() => <></>}>
  //           {children}
  //         </DashboardLayout>
  //       </EditorProvider>
  //     </ComponentProvider>
  //   </LibraryProvider>
  // )
}
