/* eslint-disable no-param-reassign */
import { DataNode } from 'antd/lib/tree'
import cytoscape, { Core } from 'cytoscape'
import { AtomType, NodeA } from '@codelab/frontend/shared'
import { propDataEntityToModel } from '@codelab/modules/prop'
import { App__PageFragment } from '@codelab/hasura'

export const pageComponentElementNodeId = (
  pageElementId: string,
  componentElementId: string,
) => `${pageElementId}--${componentElementId}`

export const PAGE_ROOT_ID = 'page_root'

export class CytoscapeService {
  static fromPage({
    elements: pageElements,
    links: pageLinks,
  }: App__PageFragment): Core {
    const nodesById: Record<string, cytoscape.NodeDefinition> = {}
    const nodesByPageElementId: Record<
      string,
      Array<cytoscape.NodeDefinition>
    > = {}
    const nodes: Array<cytoscape.NodeDefinition> = []
    const edges: Array<cytoscape.EdgeDefinition> = []
    const nodeIsTargetToALinkMap: Record<string, boolean> = {}

    const addNode = (node: cytoscape.NodeDefinition) => {
      nodesById[node.data.id as string] = node

      if (nodesByPageElementId[node.data.pageElementId as string]) {
        nodesByPageElementId[node.data.pageElementId as string].push(node)
      } else {
        nodesByPageElementId[node.data.pageElementId as string] = [node]
      }

      nodes.push(node)
    }

    //Add all elements as children to a single div root node
    //That way we convert the multiple roots that are stored in the db into a single tree
    const rootNode: cytoscape.NodeDefinition = {
      data: {
        id: PAGE_ROOT_ID,
        parent: undefined,
        label: 'Page Root',
        type: AtomType.ReactHtmlDiv, //or fragment?
      },
    }

    addNode(rootNode)

    //Add all page links. Since we don't render the page elements, go through all nodes that we created from this pageElement and add them as targets
    //     PE = PageElement    CE = ComponentElement
    //
    //        PE                                        ROOT
    //     /      \                                   /      \
    //    CE1     CE2      REMOVE PEs               CE1      CE2
    //   / \       |          --->                 /   \    /   \
    //  PE PE      PE                            CE3   CE4 CE5   CE6
    // /    \    /    \
    //CE3  CE4  CE5   CE6

    pageLinks.forEach((pageLink) => {
      if (nodesByPageElementId[pageLink.target_page_element_id]) {
        nodesByPageElementId[pageLink.target_page_element_id].forEach(
          (node) => {
            const targetElementId = pageComponentElementNodeId(
              pageLink.target_page_element_id,
              node.data.componentElementId as string,
            )

            edges.push({
              data: {
                id: `pl_${pageLink.source_page_element_id}_${pageLink.source_component_element_id}_${node.data.componentElementId}`,
                source: pageComponentElementNodeId(
                  pageLink.source_page_element_id,
                  pageLink.source_component_element_id,
                ),
                target: targetElementId,
              },
            })

            nodeIsTargetToALinkMap[targetElementId] = true
          },
        )
      }
    })

    //Go through each pageElement, then through each of it's component elements and add them as nodes + add their links
    pageElements.forEach((pageElement) => {
      //We don't push the actual pageElement, since we don't need it. We would get unnecessary fragments otherwise
      //It just acts at metadata for the node (props, etc)
      //Instead combine the id of  the pageElement and the componentElements it has, so we get a unique node id for each of them
      //And combine the metadata to form a single PageElement - ComponentElement - Atom node

      pageElement.component?.elements.forEach((componentElement) => {
        addNode({
          data: {
            id: pageComponentElementNodeId(pageElement.id, componentElement.id),
            parent: pageElement.id, //Set the default to root, we set the actual parent later  after we process the links (if it has one)
            type: componentElement.atom?.type,
            label: componentElement.label,
            pageElementId: pageElement.id,
            componentElementId: componentElement.id,
            pageElementName: pageElement.name,
            componentElementName: componentElement.label,
            props: {
              //Normalize the props fragments into a react-readable key value map
              ...pageElement.props?.props.reduce((props, newProp) => {
                return { ...props, ...propDataEntityToModel(newProp) }
              }, {}),
            },
            //TODO add props from component element
          },
        })

        //Add all component links
        pageElement.component?.links.forEach((componentLink) => {
          const sourceElementId = pageComponentElementNodeId(
            pageElement.id,
            componentLink.source_element_id,
          )

          const targetElementId = pageComponentElementNodeId(
            pageElement.id,
            componentLink.target_element_id,
          )

          edges.push({
            data: {
              id: `cl_${componentLink.source_element_id}_${componentLink.target_element_id}`,
              source: sourceElementId,
              target: targetElementId,
            },
          })

          nodeIsTargetToALinkMap[targetElementId] = true

          //Assign the parent of the target node to be the source element
          nodesById[targetElementId].data.parent = sourceElementId
        })
      })
    })

    //Find nodes without links and attach them to the root. Maybe there's a better way to do this?
    nodes.forEach((node) => {
      if (!nodeIsTargetToALinkMap[node.data.id as string]) {
        edges.push({
          data: {
            id: `root_edge_${node.data.id}`,
            source: rootNode.data.id as string,
            target: node.data.id as string,
          },
        })
      }
    })

    return cytoscape({
      headless: true,
      elements: {
        nodes,
        edges,
      },
    })
  }

  static componentTree(cy: Core): NodeA {
    const root = cy.elements().roots().first()
    console.log('root', root)

    let tree: DataNode | null = null

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any, e) => {
        const node = {
          ...v.data(),
          children: [],
        }

        v._node = node

        if (tree === null) {
          tree = node
        }

        if (e) {
          const parent: any = e.source()

          parent._node.children = Array.isArray(parent._node.children)
            ? [...parent._node.children, node]
            : [node]
        }
      },
    })

    return (tree as unknown) as NodeA
  }

  static antdTree(cy: Core): DataNode {
    const root = cy.elements().roots().first()
    let tree: DataNode | null = null

    cy.elements().breadthFirstSearch({
      root,
      visit: (v: any, e) => {
        const data = v.data()

        const node = {
          ...data,
          draggable: data.type !== AtomType.ReactRglItem,
          // disabled: data.type === VertexType.React_RGL_Item,
          key: data.id,
          title: data.label,
        }

        v._node = node

        if (tree === null) {
          tree = node
        }

        if (e) {
          const parent: any = e.source()

          parent._node.children = Array.isArray(parent._node.children)
            ? [...parent._node.children, node]
            : [node]
        }
      },
    })

    return (tree as unknown) as DataNode
  }
}
