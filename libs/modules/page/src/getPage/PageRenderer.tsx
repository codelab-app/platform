import React, { useContext } from 'react'
import {
  AppContext,
  ComponentItemType,
  PageRootNode,
} from '@codelab/frontend/shared'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { GetAppGql, useCreatePageElementMutation } from '@codelab/hasura'
import { App__PageFragment } from '@codelab/hasura'
import {
  nodeRendererFactory,
  useComponentHandlers,
} from '@codelab/frontend/builder'

type GetPageLayoutProps = {
  page: App__PageFragment
}

export const PageRenderer = ({ page }: GetPageLayoutProps) => {
  const { pageId, appId } = useContext(AppContext)

  const [addPageElement] = useCreatePageElementMutation({
    refetchQueries: [
      {
        query: GetAppGql,
        variables: {
          appId,
          pageId,
        },
      },
    ],
  })

  const cy = CytoscapeService.fromPage(page)
  const root = CytoscapeService.componentTree(cy) as PageRootNode
  console.log(root)

  const handleDroppedComponent = ({ key, label }: ComponentItemType) => {
    addPageElement({
      variables: {
        input: {
          page_id: page.id,
          component_id: key,
          name: `${label}`,
        },
      },
    })
  }

  const handlers = useComponentHandlers()

  return (
    <>
      {/*<ComponentDropHandler onDropped={handleDroppedComponent} root={root }>*/}
      {nodeRendererFactory(root, { handlers })}
      {/*<ComponentElementRenderer node={root} />*/}
      {/*</ComponentDropHandler>*/}

      {/*<Button*/}
      {/*  icon={<PlusOutlined />}*/}
      {/*  type="primary"*/}
      {/*  onClick={() => {*/}
      {/*    if (!gridContainerId) {*/}
      {/*      return*/}
      {/*    }*/}

      {/*    addChildVertex({*/}
      {/*      refetchQueries: [*/}
      {/*        { query: GetPageGql, variables: { input: { pageId } } },*/}
      {/*      ],*/}
      {/*      variables: {*/}
      {/*        input: {*/}
      {/*          parentVertexId: gridContainerId,*/}
      {/*          vertex: {*/}
      {/*            type: AtomType.ReactRglItem,*/}
      {/*          },*/}
      {/*        },*/}
      {/*      },*/}
      {/*    })*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Add Grid*/}
      {/*</Button>*/}
      {/* <D3Graph {...makeD3(graph)} onNodeClick={onNodeClick} /> */}
    </>
  )
}
