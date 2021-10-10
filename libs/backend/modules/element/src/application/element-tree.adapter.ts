import { BaseAdapter } from '@codelab/backend/abstract/core'
import {
  DgraphAtom,
  DgraphComponent,
  DgraphElement,
  isDgraphComponent,
  isDgraphElement,
} from '@codelab/backend/infra'
import {
  TypeEdge,
  TypeGraphAdapter,
  TypeVertex,
} from '@codelab/backend/modules/type'
import {
  breadthFirstTraversal,
  CytoscapeService,
} from '@codelab/backend/shared/generic'
import { IField, TypeKind } from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { Injectable, Logger } from '@nestjs/common'
import cytoscape, { Core } from 'cytoscape'
import * as _ from 'lodash'
import { ComponentAdapter } from '../domain/component/component.adapter'
import { ElementEdge } from '../domain/element/element-edge.model'
import { ElementGraph } from '../domain/element/element-graph.model'
import { ElementVertex } from '../domain/element/element-vertex.model'
import { GetComponentsService } from '../use-cases/component/get-components'
import { ElementAdapter } from './element.adapter'

// FIXME this class is getting too big, need to refactor it soon - perhaps move some parts to shared/graph/element?

export type Node = DgraphElement | DgraphComponent

@Injectable()
export class ElementTreeAdapter extends BaseAdapter<
  DgraphElement,
  Promise<ElementGraph>
> {
  constructor(
    private elementMapper: ElementAdapter,
    private componentAdapter: ComponentAdapter,
    private cytoscapeService: CytoscapeService,
    private typeGraphAdapter: TypeGraphAdapter,
    private getComponentsService: GetComponentsService,
  ) {
    super()
  }

  /**
   * Transforms a DgraphElement to an ElementGraph
   * @param root
   */
  async mapItem(root: DgraphElement): Promise<ElementGraph> {
    // Keep the atoms in a context, because if there are duplicate atoms anywhere in the tree
    // dgraph will return only the ID of the atom after the first time
    const atomContext = new Map<string, DgraphAtom>()
    const componentContext = new Map<string, DgraphComponent>()
    // Those are the components we need to fetch, which are in props
    const extraComponentsRef = new Set<string>()
    const cy = cytoscape({ headless: true })

    await breadthFirstTraversal<Node>({
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

    let n = 0

    while (extraComponentsRef.size > 0) {
      n++

      if (n > 1000) {
        throw new Error('Components too nested')
      }

      await this.getAllExtraComponents(
        extraComponentsRef,
        atomContext,
        componentContext,
        cy,
      )
    }

    const { edges, vertices } = this.cytoscapeService.treeToGraph<
      ElementVertex,
      ElementEdge
    >(
      cy,
      (node) => this.mapVertex(node, atomContext, componentContext),
      (edge) => new ElementEdge(edge),
    )

    return new ElementGraph(vertices, edges)
  }

  private async getAllExtraComponents(
    extraComponentsRef: Set<string>,
    atomContext: Map<string, DgraphAtom>,
    componentContext: Map<string, DgraphComponent>,
    cy: Core,
  ): Promise<void> {
    const components = await this.getComponentsService.execute({
      componentIds: Array.from(extraComponentsRef),
    })

    extraComponentsRef.clear()

    await Promise.all(
      components.map((component) => {
        return breadthFirstTraversal<Node>({
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

  private mapVertex(
    node: any,
    atomContext: Map<string, DgraphAtom>,
    componentContext: Map<string, DgraphComponent>,
  ): ElementVertex {
    if (isDgraphComponent(node.data)) {
      return this.componentAdapter.mapItem(node.data)
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

    return this.elementMapper.mapItem({ ...element, atom, component })
  }

  private async visit(
    node: Node,
    parentNode: Node | undefined | null,
    atomContext: Map<string, DgraphAtom>,
    componentContext: Map<string, DgraphComponent>,
    cy: Core,
    extraComponentsRef: Set<string>,
  ) {
    if (isDgraphElement(node)) {
      if (node.atom?.['dgraph.type'] && node.atom?.['api']) {
        atomContext.set(node.atom.uid, node.atom)
      }

      if (cy.getElementById(node.uid).length === 0) {
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
      }

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
      const props = this.parseNodeProps(node)
      const typeTree = await this.parseNodeTypeTree(node)

      const componentIdsFromUnionProps =
        await this.getComponentIdFromUnionTypeProps(props, typeTree)

      componentIdsFromUnionProps.forEach((id) => extraComponentsRef.add(id))

      const renderPropsComponentIdsFromProps =
        await this.getComponentIdFromProps(
          props,
          typeTree,
          TypeKind.RenderPropsType,
        )

      renderPropsComponentIdsFromProps.forEach((id) =>
        extraComponentsRef.add(id),
      )

      const reactNodeComponentIdsFromProps = await this.getComponentIdFromProps(
        props,
        typeTree,
        TypeKind.ReactNodeType,
      )

      reactNodeComponentIdsFromProps.forEach((id) => extraComponentsRef.add(id))

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

  private parseNodeProps(node: DgraphElement): Record<string, any> | null {
    if (!node?.props) {
      return null
    }

    try {
      const props = JSON.parse(node.props)

      return props
    } catch (e) {
      Logger.error(`Error while parsing props ${node.props}.`, e)

      return null
    }
  }

  private async parseNodeTypeTree(
    node: DgraphElement,
  ): Promise<TypeTree<TypeVertex, TypeEdge> | null> {
    if (!node?.atom?.api) {
      return null
    }

    const typeGraph = await this.typeGraphAdapter.mapItem(node.atom.api)

    return new TypeTree(typeGraph)
  }

  private getComponentIdFromUnionTypeProps(
    nodeProps: Record<string, any> | null,
    tree: TypeTree<TypeVertex, TypeEdge> | null,
  ) {
    if (!nodeProps || !tree) {
      return []
    }

    const fields = [
      ...tree.getUnionTypeFieldContainingType(TypeKind.ReactNodeType),
      ...tree.getUnionTypeFieldContainingType(TypeKind.RenderPropsType),
    ]

    return this.getComponentIdFromPropsByFields(nodeProps, fields, '.id')
  }

  private getComponentIdFromPropsByFields(
    props: Record<string, any> | null,
    fields: Array<IField>,
    idPath: string,
  ) {
    return fields
      .map(({ key }) => {
        const componentId = _.get(props, key + idPath)

        if (componentId) {
          if (typeof componentId !== 'string') {
            Logger.error(`component id at ${key} isn't a string`)

            return null
          }

          return componentId
        }

        return null
      })
      .filter((ids) => ids) as Array<string>
  }

  private getComponentIdFromProps(
    nodeProps: Record<string, any> | null,
    tree: TypeTree<TypeVertex, TypeEdge> | null,
    type: TypeKind,
  ) {
    if (!nodeProps || !tree) {
      return []
    }

    const fieldsTypeRenderProps = tree.getFieldsByTypeKind(type)

    return this.getComponentIdFromPropsByFields(
      nodeProps,
      fieldsTypeRenderProps,
      '.id',
    )
  }

  private async getComponentIdsFromComponentTypeProps(
    nodeProps: Record<string, any> | null,
    tree: TypeTree<TypeVertex, TypeEdge> | null,
  ): Promise<Array<string>> {
    if (!nodeProps || !tree) {
      return []
    }

    const allComponentFields = tree.getFieldsByTypeKind(TypeKind.ComponentType)

    if (allComponentFields.length) {
      const componentKeys = this.getKeysWithComponentType(tree)

      if (componentKeys.length > 0) {
        return this.getAllValuesByKeys(componentKeys, nodeProps)
      }
    }

    return []
  }

  private getAllValuesByKeys(
    keys: Array<string>,
    props: Record<string, any>,
  ): Array<string> {
    return keys
      .map((key) => {
        try {
          return _.get(props, key)
        } catch (e) {
          Logger.error('Error while parsing prop value. ', e)

          return null
        }
      })
      .filter(
        (v): v is string => !!v && typeof v === 'string' && v.startsWith('0x'),
      )
  }

  private getKeysWithComponentType(tree: TypeTree<any, any>): Array<string> {
    const rootFields = tree.getRootFields()
    const keysToCheck: Array<string> = []

    const visitField = (field: IField, path: string) => {
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

    return keysToCheck
  }
}
