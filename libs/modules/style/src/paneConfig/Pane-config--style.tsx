/* import { AssignStyleForm } from '../assignStyle' */
// import {
//   GetStylesGql,
//   GetVertexGql,
//   useUnAssignStyleMutation,
// } from '@codelab/generated'
import { PageHeader } from 'antd'
import React from 'react'

export const PaneConfigStyle = ({ vertexId }: { vertexId: string }) => {
  // const [unassign] = useUnAssignStyleMutation({
  //   refetchQueries: [
  //     {
  //       query: GetVertexGql,
  //       variables: {
  //         input: {
  //           id: vertexId,
  //         },
  //       },
  //     },
  //     {
  //       query: GetStylesGql,
  //       variables: {
  //         input: {
  //           appId,
  //         },
  //       },
  //     },
  //   ],
  // })

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        title="Assigned Styles"
      >
        {/* <List
          dataSource={styles?.filter((s) =>
            s?.vertices?.find((v) => v.id === vertexId),
          )}
          renderItem={(i) => (
            <List.Item
              extra={
                <Button
                  icon={<CloseOutlined />}
                  onClick={() =>
                    unassign({
                      variables: {
                        input: {
                          styleId: i.id,
                          vertexId,
                        },
                      },
                    })
                  }
                />
              }
            >
              <Button
                type="link"
                onClick={() => {
                  openUpdateStyle(i.id)
                }}
              >
                {i.name || 'Nameless style'}
              </Button>
            </List.Item>
          )}
        /> */}
      </PageHeader>
      {/* <AssignStyleForm vertexId={vertexId} /> */}
    </>
  )
}
