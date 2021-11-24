import { DgraphEntityType } from '@codelab/backend/infra'
import { AtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { AddHookToElementService } from '../hooks/add-hook-to-element'
import { hookFactory } from '../hooks/add-hook-to-element/hook.factory'
import { CreatePropMapBindingService } from '../prop-mapping/create-prop-map-binding'
import {
  CreateElementChildInput,
  CreateElementInput,
  NewHookRef,
  NewPropMapBindingRef,
} from './create-element.input'

export type AtomIdResolver = (atomType: AtomType) => Promise<string> | string

/**
 * Don't reuse, create new instance for each mutation
 */
export class ElementMutationFactory {
  private readonly elementRefIdMap: Map<string, string>

  private iteration: number

  constructor(private readonly atomIdResolver: AtomIdResolver) {
    this.elementRefIdMap = new Map<string, string>()
    this.iteration = 0
  }

  public create(input: CreateElementInput, blankNodeUid: string) {
    return this.makeElementMutation(input, blankNodeUid)
  }

  /** Stores the blank node to refId mapping and generates a new unique blank node id if one is not provided */
  private blankNodeFactory(
    child: CreateElementChildInput,
    blankNode?: string,
  ): string {
    blankNode = blankNode ?? `_:${v4()}`

    if (child.refId) {
      const found = this.elementRefIdMap.get(child.refId)

      if (found) {
        return found
      }

      this.elementRefIdMap.set(child.refId, blankNode)
    }

    return blankNode
  }

  private resolveElementRef(elementIdRef: string) {
    const found = this.elementRefIdMap.get(elementIdRef)

    if (found) {
      return found
    }

    throw new Error(
      `Unknown element id reference ${elementIdRef}. Set it to an existing element refId in the input or to an actual hexadecimal dgraph uid`,
    )
  }

  private async makeElementMutation(
    input: CreateElementChildInput,
    blankNodeUid?: string,
  ): Promise<Record<string, any>> {
    const {
      order,
      name,
      atom,
      childrenIds,
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

    const childrenMutations = await this.makeChildrenMutations(
      childrenIds,
      children,
    )

    if (props) {
      try {
        JSON.parse(props)
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

    const createTagJson = {
      'dgraph.type': [DgraphEntityType.Tag],
      name,
      isRoot: true,
    }

    return {
      uid: this.blankNodeFactory(input, blankNodeUid),
      name,
      'dgraph.type': [DgraphEntityType.Element],
      'children|order': order ? order : 1,
      children: childrenMutations,
      atom: atomId ? { uid: atomId } : undefined,
      props: props ?? '{}',
      css,
      hooks: hookMutations,
      renderForEachPropKey,
      renderIfPropKey,
      propTransformationJs,
      propMapBindings: propMapBindingMutations,
      componentTag: isComponent ? createTagJson : undefined,
    }
  }

  private async makeChildrenMutations(
    childrenIds: Array<string> | undefined,
    children: Array<CreateElementChildInput> | undefined,
  ) {
    const childrenIdsMutations =
      childrenIds?.map((c, i) => ({ uid: c, 'children|order': i })) ?? []

    const childrenMutations = await Promise.all(
      children?.map((child, i) =>
        this.makeElementMutation({ ...child, order: child.order ?? i }),
      ) ?? [],
    )

    return [...childrenIdsMutations, ...childrenMutations]
  }

  private makePropMapBindingMutations(
    propMapBindings: Array<NewPropMapBindingRef> | undefined,
  ) {
    if (!propMapBindings) {
      return []
    }

    return propMapBindings.map((binding) =>
      CreatePropMapBindingService.createPropMapBindingMutation(
        {
          ...binding,
          targetElementId: binding.targetElementId
            ? this.resolveElementRef(binding.targetElementId)
            : undefined,
        },
        undefined,
      ),
    )
  }

  private makeHookMutations(hooks: Array<NewHookRef> | undefined) {
    if (!hooks) {
      return []
    }

    return hooks.map((hookInput) => {
      return AddHookToElementService.createHookMutation(
        hookFactory(hookInput),
        undefined,
      )
    })
  }
}
