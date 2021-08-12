import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import React from 'react'

export const LibraryExplorerList = () => {
  // const { data, loading } = useLibraryExplorerQuery()

  const { openDeleteModal, openUpdateModal } = useCrudModalForm(
    EntityType.Library,
  )

  return <></>

  // return loading ? (
  //   <Spin />
  // ) : (
  //   <List
  //     size="small"
  //     dataSource={data?.library}
  //     renderItem={(library: any) => (
  //       <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
  //         <Space style={{ width: '100%' }}>
  //           <Link
  //             href={{
  //               pathname: PageType.LibraryDetail,
  //               query: {
  //                 libraryId: library.id,
  //               },
  //             }}
  //           >
  //             {library.name}
  //           </Link>
  //         </Space>
  //         <Space>
  //           <ListItemSettingsButton
  //             onClick={() => openUpdateModal(library.id)}
  //           />
  //           <ListItemDeleteButton onClick={() => openDeleteModal(library.id)} />
  //         </Space>
  //       </List.Item>
  //     )}
  //   />
  // )
}
