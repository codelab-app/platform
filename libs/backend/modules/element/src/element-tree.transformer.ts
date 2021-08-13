import {
  breadthFirstTraversal,
  CytoscapeService,
  DgraphAtom,
  DgraphComponent,
  DgraphElement,
  isDgraphComponent,
  isDgraphElement,
} from '@codelab/backend/infra'
import { TypeGraphMapper } from '@codelab/backend/modules/type'
import {
  IFieldVertex,
  TypeGraphTreeAdapter,
  TypeKind,
} from '@codelab/shared/graph'
import { Injectable, Logger } from '@nestjs/common'
import cytoscape, { Core } from 'cytoscape'
import * as _ from 'lodash'
import { ComponentMapper } from './component'
import { GetComponentsService } from './component/use-cases'
import { ElementMapper } from './element.mapper'
import { ElementEdge, ElementGraph, ElementVertex } from './models'

// FIXME this class is getting too big, need to refactor it soon

@Injectable()
export class ElementTreeTransformer {
  constructor(
    private elementMapper: ElementMapper,
    private componentMapper: ComponentMapper,
    private cytoscapeService: CytoscapeService,
    private typeGraphMapper: TypeGraphMapper,
    private getComponentsService: GetComponentsService,
  ) {}

  /**
   * Transforms a DgraphElement to an ElementGraph
   * @param root
   */
  async transform(root: DgraphElement): Promise<ElementGraph> {
    // Keep the atoms in a context, because if there are duplicate atoms anywhere in the tree
    // dgraph will return only the ID of the atom after the first time
    const atomContext = new Map<string, DgraphAtom>()
    const componentContext = new Map<string, DgraphComponent>()
    const cy = cytoscape()
    const extraComponentsRef = new Set<string>()

    await breadthFirstTraversal<DgraphElement | DgraphComponent>({
      root,
      extractId: (el) => el.uid,
      visit: async (node, parentNode) => {
        return this.visit(
          node,
          parentNode,
          atomContext,
          componentContext,
          cy,
          extraComponentsRef,
        )
      },
    })

    // FIXME Need to clean this up
    let n = 0

    while (extraComponentsRef.size > 0) {
      n++

      if (n > 1000) {
        throw new Error('Components too nested')
      }

      const components = await this.getComponentsService.execute({
        componentIds: Array.from(extraComponentsRef),
      })

      extraComponentsRef.clear()

      await Promise.all(
        components.map((component) => {
          return breadthFirstTraversal<DgraphElement | DgraphComponent>({
            root: component,
            extractId: (el) => el.uid,
            visit: async (node, parentNode) => {
              return this.visit(
                node,
                parentNode,
                atomContext,
                componentContext,
                cy,
                extraComponentsRef,
              )
            },
          })
        }),
      )
    }

    const { edges, vertices } = await this.cytoscapeService.treeToGraph<
      ElementVertex,
      ElementEdge
    >(
      cy,
      (node) => {
        if (isDgraphComponent(node.data)) {
          return this.componentMapper.map(node.data)
        }

        const element = node.data as DgraphElement

        const atom =
          element.atom?.uid && atomContext.has(element.atom?.uid)
            ? atomContext.get(element.atom?.uid)
            : element.atom

        const component =
          element.component?.uid && componentContext.has(element.component?.uid)
            ? componentContext.get(element.component?.uid)
            : element.component

        return this.elementMapper.map({ ...element, atom, component })
      },
      (edgeData) =>
        new ElementEdge(edgeData.source, edgeData.target, edgeData.order),
    )

    return new ElementGraph(vertices, edges)
  }

  private async visit(
    node: DgraphElement | DgraphComponent,
    parentNode: DgraphElement | DgraphComponent | undefined | null,
    atomContext: Map<string, DgraphAtom>,
    componentContext: Map<string, DgraphComponent>,
    cy: Core,
    extraComponentsRef: Set<string>,
  ) {
    if (isDgraphElement(node)) {
      if (node.atom?.['dgraph.type'] && node.atom?.['api']) {
        atomContext.set(node.atom.uid, node.atom)
      }

      cy.add({
        data: {
          id: node.uid,
          parent: parentNode?.uid,
          data: {
            ...node,
            'children|order': undefined,
            children: undefined,
          },
        },
      })

      if (parentNode) {
        cy.add({
          data: {
            source: parentNode.uid,
            target: node.uid,
            order: node['children|order'],
          },
        })
      }

      // If this is a 'full' component, ie - one that dgraph returns in full, even
      // if there are duplicate ones in the tree
      if (node.component?.['dgraph.type']) {
        componentContext.set(node.component.uid, node.component)

        if (cy.getElementById(node.component.uid).length === 0) {
          cy.add({
            data: {
              id: node.component.uid,
              data: node.component,
            },
          })
        }
      }

      if (node.component) {
        // Add the edge here, because if we add it in the lower block, it won't add edges from
        // different elements to the same component, since we don't visit the same node twice
        cy.add({
          data: {
            source: node.uid,
            target: node.component.uid,
          },
        })

        // Returning the component makes sure we have the parent-child relationship of element-component-element
        // instead of just element-element
        return [node.component]
      }

      // We can provide Component ids as props. Since they are likely outside the tree, we need
      // to fetch them and put them in there, so they're available
      const componentIdsFromProps = await this.getComponentIdsFromProps(node)

      componentIdsFromProps.forEach((id) => extraComponentsRef.add(id))

      // Edge case alert:
      // sort the children by ID, because it seems that that's how dgraph executes the query
      // but sometimes results don't match that. If we start with a element with a latter id,
      // and we have elements with the same atom - the atom of the element with the latter ID won't have
      // propTypes defined, because they are already defined in the element with the prior ID
      return node.children?.slice().sort((a, b) => b.uid.localeCompare(a.uid))
    } else {
      if (cy.getElementById(node.uid).length === 0) {
        cy.add({
          data: {
            id: node.uid,
            data: node,
          },
        })
      }

      return [node.root]
    }
  }

  private async getComponentIdsFromProps(
    node: DgraphElement,
  ): Promise<Array<string>> {
    if (!node?.props || !node?.atom?.api) {
      return []
    }

    let props: Record<string, any>

    try {
      props = JSON.parse(node.props)
    } catch (e) {
      Logger.error(`Error while parsing props ${node.props}.`, e)

      return []
    }

    const typeGraph = await this.typeGraphMapper.map(node.atom.api)
    const tree = new TypeGraphTreeAdapter(typeGraph)
    const allComponentFields = tree.getFieldsByTypeKind(TypeKind.ComponentType)

    if (allComponentFields.length) {
      const rootFields = tree.getRootFields()
      const keysToCheck: Array<string> = []

      const visitField = (field: IFieldVertex, path: string) => {
        const type = tree.getFieldType(field.id)
        const kind = type?.typeKind

        if (!type || !kind) {
          return
        }

        if (kind === TypeKind.ComponentType) {
          keysToCheck.push(path)
        } else if (kind === TypeKind.InterfaceType) {
          const innerFields = tree.getFields(type.id)
          innerFields.forEach((innerField) =>
            visitField(innerField, `${path}.${innerField.key}`),
          )
        }
      }

      rootFields.forEach((field) => visitField(field, field.key))

      if (keysToCheck.length > 0) {
        return keysToCheck
          .map((key) => {
            try {
              return _.get(props, key)
            } catch (e) {
              Logger.error('Error while parsing prop value. ', e)

              return null
            }
          })
          .filter(
            (v): v is string =>
              !!v && typeof v === 'string' && v.startsWith('0x'),
          )
      }
    }

    return []
  }
}
