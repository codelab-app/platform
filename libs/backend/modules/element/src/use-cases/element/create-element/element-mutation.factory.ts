import { DgraphEntityType } from '@codelab/backend/infra'
import { AtomType, IUser } from '@codelab/shared/abstract/core'
import { hexadecimalRegex, pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { slugify } from 'voca'
import { AddHookToElementService } from '../hooks/add-hook-to-element'
import { CreatePropMapBindingService } from '../prop-mapping/create-prop-map-binding'
import {
  CreateElementChildInput,
  CreateElementInput,
  ElementRef,
  HookRef,
  NewPropMapBindingRef,
} from './create-element.input'

export type AtomIdResolver = (atomType: AtomType) => Promise<string> | string

/**
 * Don't reuse, create new instance for each mutation
 */
export class ElementMutationFactory {
  private readonly blankNodeByRefIsMap: Map<string, string>

  private iteration: number

  constructor(
    private readonly atomIdResolver: AtomIdResolver,
    private readonly currentUser: IUser | undefined,
  ) {
    this.blankNodeByRefIsMap = new Map<string, string>()
    this.iteration = 0
  }

  public create(input: CreateElementInput, blankNodeUid: string) {
    // Store all the element id refs from the start so that if any id is referenced
    // before we visit it, we have it in the map
    this.storeAllElementRefIds(input, blankNodeUid)

    return this.makeElementMutation(input, blankNodeUid)
  }

  private storeAllElementRefIds(
    input: CreateElementInput,
    blankNodeUid: string,
  ) {
    this.blankNodeFactory(input, blankNodeUid)

    const visitChildren = (innerInput: CreateElementChildInput): void => {
      if (innerInput.children) {
        for (const child of innerInput.children) {
          if (child.newElement) {
            this.blankNodeFactory(child.newElement)
            visitChildren(child.newElement)
          }
        }
      }
    }

    visitChildren(input)
  }

  /** Stores the blank node to refId mapping and generates a new unique blank node id if one is not provided */
  private blankNodeFactory(
    child: CreateElementChildInput,
    blankNode?: string,
  ): string {
    blankNode = blankNode ?? `_:${child.refId ? slugify(child.refId) : v4()}`

    if (child.refId) {
      const found = this.blankNodeByRefIsMap.get(child.refId)

      if (found) {
        return found
      }

      this.blankNodeByRefIsMap.set(child.refId, blankNode)
    }

    return blankNode
  }

  private resolveElementRef(elementIdRef: string) {
    const resolved = this.blankNodeByRefIsMap.get(elementIdRef)

    if (resolved) {
      return resolved
    }

    if (!hexadecimalRegex.test(elementIdRef)) {
      throw new Error(
        `Unrecognized element ref id ${elementIdRef}. Provide either a reference to a element in the same input tree or a hexadecimal uid of an existing element`,
      )
    }

    return elementIdRef
  }

  private async makeElementMutation(
    input: CreateElementChildInput,
    blankNodeUid?: string,
  ): Promise<Record<string, any>> {
    const {
      order,
      name,
      atom,
      children,
      css,
      props,
      hooks,
      propTransformationJs,
      renderForEachPropKey,
      renderIfPropKey,
      propMapBindings,
      isComponent,
    } = input

    this.iteration++

    if (this.iteration > 100000) {
      throw new Error('Element graph too nested or in infinite loop')
    }

    const childrenMutations = await this.makeChildrenMutations(children)
    const elementUid = this.blankNodeFactory(input, blankNodeUid)

    const propsMutation = {
      uid: `_:props${elementUid}`,
      data: '{}',
    }

    if (props) {
      try {
        JSON.parse(props)
        propsMutation.data = props
      } catch (e) {
        throw new Error(`Props must be valid JSON, got ${props}`)
      }
    }

    const hookMutations = this.makeHookMutations(hooks)

    const propMapBindingMutations =
      this.makePropMapBindingMutations(propMapBindings)

    let atomId

    if (atom?.atomType) {
      atomId = await this.atomIdResolver(atom.atomType)
    } else if (atom?.atomId) {
      atomId = atom.atomId
    }

    let elementName = name

    if (!elementName && atom?.atomType) {
      elementName = pascalCaseToWords(atom.atomType)
    }

    return {
      uid: elementUid,
      'dgraph.type': [DgraphEntityType.Element],
      name: elementName,
      owner: this.currentUser
        ? {
            uid: this.currentUser.id,
          }
        : {},
      'children|order': order ? order : 1,
      children: childrenMutations,
      atom: atomId ? { uid: atomId } : undefined,
      props: propsMutation,
      css,
      hooks: hookMutations,
      renderForEachPropKey,
      renderIfPropKey,
      propTransformationJs,
      propMapBindings: propMapBindingMutations,
      componentTag: isComponent
        ? ElementMutationFactory.componentTagJson(elementName)
        : undefined,
    }
  }

  public static componentTagJson(name?: string) {
    return {
      'dgraph.type': [DgraphEntityType.Tag],
      name,
      isRoot: true,
    }
  }

  private makeChildrenMutations(children: Array<ElementRef> | undefined) {
    return Promise.all(
      children?.map((child, i) => {
        if (child.elementId) {
          const blankNode = this.resolveElementRef(child.elementId)

          return { uid: blankNode ?? child.elementId, 'children|order': i + 1 }
        }

        if (child.newElement) {
          return this.makeElementMutation({
            ...child.newElement,
            order: child.newElement.order ?? i + 1,
          })
        }

        throw new Error('Provide either elementId or newElement for ElementRef')
      }) ?? [],
    )
  }

  private makePropMapBindingMutations(
    propMapBindings: Array<NewPropMapBindingRef> | undefined,
  ) {
    if (!propMapBindings) {
      return []
    }

    return propMapBindings.map((binding) => {
      let targetElementId

      if (binding.targetElementId) {
        targetElementId = this.resolveElementRef(binding.targetElementId)

        // We want to make sure we resolve the ref here, because we don't want it to point to external element ids, but only ones inside the graph
        // this minimizes risk of creating invalid references, in case an external element id is passed, which is not in the database where we're importing
        if (!targetElementId) {
          throw new Error(
            `Could not resolve targetElementId ${binding.targetElementId}. Assign a refId to the element before binding.`,
          )
        }
      }

      return CreatePropMapBindingService.createPropMapBindingMutation(
        {
          ...binding,
          targetElementId,
        },
        undefined,
      )
    })
  }

  private makeHookMutations(hooks: Array<HookRef> | undefined) {
    if (!hooks) {
      return []
    }

    return hooks.map((hookInput) => {
      return AddHookToElementService.createHookMutation(hookInput, undefined)
    })
  }
}
