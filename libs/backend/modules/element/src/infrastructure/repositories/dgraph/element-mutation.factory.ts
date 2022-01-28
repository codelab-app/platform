import {
  DgraphEntityType,
  IMutationFactory,
} from '@codelab/backend/abstract/core'
import {
  makeArrayDiffMutation,
  makeDeleteJsonMutationForUpdates,
  mergeMutations,
  NullablePredicates,
  randomBlankNode,
} from '@codelab/backend/infra'
import { HookMutationFactory } from '@codelab/backend/modules/hook'
import { PropMutationFactory } from '@codelab/backend/modules/prop'
import { IElement, IHook, ITag } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Mutation } from 'dgraph-js-http'
import { v4 } from 'uuid'
import { PropMapBindingMutationFactory } from './prop-map-binding-mutation.factory'

@Injectable()
export class ElementMutationFactory implements IMutationFactory<IElement> {
  static readonly ElementNullables: NullablePredicates<IElement> = [
    'name',
    'css',
    'instanceOfComponent',
    'atom',
    'componentTag',
    'fixedId',
    'renderForEachPropKey',
    'renderIfPropKey',
    'propTransformationJs',
    'parentElementId',
    'order',
    'owner',
  ]

  private readonly propMutationFactory: PropMutationFactory

  private readonly hookMutationFactory: HookMutationFactory

  private readonly pmbMutationFactory: PropMapBindingMutationFactory

  constructor() {
    this.propMutationFactory = new PropMutationFactory()
    this.hookMutationFactory = new HookMutationFactory()
    this.pmbMutationFactory = new PropMapBindingMutationFactory()
  }

  componentTagMutation = (input: ITag, uid?: string) => {
    return {
      uid,
      'dgraph.type': [DgraphEntityType.Tag],
      owner: input?.owner?.id ? { uid: input.owner.id } : null,
      name: input?.name,
      isRoot: true,
    }
  }

  // Common ground between element update and create mutations
  // Needed, because we handle the 1-M relations differently in both (hooks and propMapBindings)
  baseSetJsonMutation(element: IElement, uid?: string): Mutation {
    const propUid = element.props.id || randomBlankNode()

    const core = {
      setJson: {
        uid: uid || element.id || randomBlankNode(),
        'dgraph.type': [DgraphEntityType.Element],
        fixedId: element.fixedId ?? v4(),
        name: element.name,
        css: element.css,
        propTransformationJs: element.propTransformationJs,
        renderForEachPropKey: element.renderForEachPropKey,
        renderIfPropKey: element.renderIfPropKey,
        owner: element.owner ? { uid: element.owner.id } : undefined,
        componentTag: element.componentTag
          ? this.componentTagMutation(
              element.componentTag,
              element.componentTag.id ?? undefined,
            )
          : undefined,
        props: { uid: propUid },
        // \/ we don't want to update the other element and atom here, it's a separate aggregate root instance
        instanceOfComponent: element.instanceOfComponent
          ? { uid: element.instanceOfComponent.id }
          : undefined,
        atom: element.atom ? { uid: element.atom.id } : undefined,
      },
    }

    const props = this.propMutationFactory.forCreate(element.props, propUid)

    return mergeMutations(core, props)
  }

  forCreate(entity: IElement, uid?: string): Mutation {
    uid = uid || randomBlankNode()

    const base = this.baseSetJsonMutation(entity, uid)
    const relationshipMutations: Array<Mutation> = []
    this.hookMutationsForCreate(entity, relationshipMutations, uid)
    this.pmbMutationsForCreate(entity, relationshipMutations, uid)
    this.parentChildMutationForCreate(entity, relationshipMutations, uid)

    return mergeMutations(base, ...relationshipMutations)
  }

  private parentChildMutationForCreate(
    entity: IElement,
    relationshipMutations: Array<Mutation>,
    uid: string,
  ): void {
    if (entity.parentElement) {
      relationshipMutations.push({
        setJson: {
          uid: entity.parentElement.id,
          children: [
            {
              uid,
              'children|order': entity.parentElement
                ? entity.parentElement.order ?? 1
                : undefined,
            },
          ],
        },
      })
    }
  }

  private pmbMutationsForCreate(
    entity: IElement,
    relationshipMutations: Array<Mutation>,
    uid: string,
  ): void {
    if (!entity.propMapBindings) {
      return
    }

    for (const pmb of entity.propMapBindings) {
      const pmbUid = randomBlankNode()

      relationshipMutations.push(this.pmbMutationFactory.forCreate(pmb, pmbUid))
      relationshipMutations.push({
        setJson: { uid, propMapBindings: [{ uid: pmbUid }] },
      })
    }
  }

  private hookMutationsForCreate(
    entity: IElement,
    relationshipMutations: Array<Mutation>,
    uid: string,
  ): void {
    if (!entity.hooks) {
      return
    }

    for (const hook of entity.hooks) {
      const hookUid = randomBlankNode()

      relationshipMutations.push(
        this.hookMutationFactory.forCreate(hook, hookUid),
      )
      relationshipMutations.push({
        setJson: { uid, hooks: [{ uid: hookUid }] },
      })
    }
  }

  forUpdate(entity: IElement, oldEntity: IElement): Mutation {
    if (!entity.id) {
      throw new Error(`Element can't be updated without id`)
    }

    // The base update mutation, which updates the Element's predicates
    const coreUpdateMutation: Mutation = this.baseSetJsonMutation(
      entity,
      entity.id,
    )

    const relationshipMutations: Array<Mutation> = []

    // Creates the parent <children> child edge, if parentElement is set, and updates the order
    if (entity.parentElement) {
      relationshipMutations.push({
        setJson: {
          uid: entity.parentElement.id,
          children: [
            {
              uid: entity.id,
              'children|order': entity.parentElement.order ?? 1,
            },
          ],
        },
      })
    }

    // Deletes the old parent <children> child edge, if needed
    if (
      oldEntity.parentElement &&
      oldEntity.parentElement.id !== entity.parentElement?.id
    ) {
      relationshipMutations.push({
        deleteJson: {
          uid: oldEntity.parentElement.id,
          children: { uid: entity.id },
        },
      })
    }

    // Deletes all nullable predicates which are set to null/undefined
    // because if we use just {setJson: {somePredicate: null}}, they will stay
    const deleteNullPredicatesMutation = makeDeleteJsonMutationForUpdates(
      entity,
      entity.id,
      ElementMutationFactory.ElementNullables,
    )

    // Delete owned relations if they've changed
    if (entity.props.id !== oldEntity.props.id) {
      relationshipMutations.push(
        this.propMutationFactory.forDelete(oldEntity.props),
      )
    }

    if (
      oldEntity.componentTag &&
      entity.componentTag?.id !== oldEntity.componentTag.id
    ) {
      relationshipMutations.push({
        deleteJson: { uid: oldEntity.componentTag.id },
      })
    }

    // Creates/Deletes/Updates hooks as necessary to match the newly provided hooks
    // This could be abstracted, but it's a bit more readable this way
    const hookMutation = makeArrayDiffMutation<IHook>(
      oldEntity.hooks,
      entity.hooks,
      {
        forCreate: (hook) => {
          const hookId = randomBlankNode()
          relationshipMutations.push({
            setJson: { uid: entity.id, hooks: { uid: hookId } },
          })

          return this.hookMutationFactory.forCreate(hook, hookId)
        },
        forUpdate: (hook: IHook, oldHook: IHook): Mutation => {
          return this.hookMutationFactory.forUpdate(hook, oldHook)
        },
        forDelete: (hook: IHook): Mutation => {
          const baseDelete = this.hookMutationFactory.forDelete(hook)

          const relDelete: Mutation = {
            deleteJson: { uid: entity.id, hooks: { uid: hook.id } },
          }

          return mergeMutations(baseDelete, relDelete)
        },
      },
    )

    // Creates/Deletes/Updates prop map bindings as necessary to match the newly provided hooks
    const pmbMutations = makeArrayDiffMutation(
      oldEntity.propMapBindings,
      entity.propMapBindings,
      {
        forCreate: (pmb) => {
          const pmbId = randomBlankNode()
          relationshipMutations.push({
            setJson: { uid: entity.id, propMapBindings: { uid: pmbId } },
          })

          return this.pmbMutationFactory.forCreate(pmb, pmbId)
        },
        forUpdate: (pmb, oldPmb) =>
          this.pmbMutationFactory.forUpdate(pmb, oldPmb),
        forDelete: (pmb) => {
          const baseDelete = this.pmbMutationFactory.forDelete(pmb)

          const relDelete: Mutation = {
            deleteJson: { uid: entity.id, propMapBindings: { uid: pmb.id } },
          }

          return mergeMutations(baseDelete, relDelete)
        },
      },
    )

    return mergeMutations(
      coreUpdateMutation,
      deleteNullPredicatesMutation,
      hookMutation,
      pmbMutations,
      ...relationshipMutations,
    )
  }

  forAttachHook(elementId: string, hookId: string): Mutation {
    return {
      setJson: {
        uid: elementId,
        hooks: [{ uid: hookId }],
      },
    }
  }

  forDetachHook(elementId: string, hookId: string): Mutation {
    return {
      deleteJson: {
        uid: elementId,
        hooks: [{ uid: hookId }],
      },
    }
  }

  forAttachPropMapBinding(elementId: string, pmbId: string): Mutation {
    return {
      setJson: {
        uid: elementId,
        propMapBindings: [{ uid: pmbId }],
      },
    }
  }

  forDetachPropMapBinding(elementId: string, pmbId: string): Mutation {
    return {
      deleteJson: {
        uid: elementId,
        propMapBindings: [{ uid: pmbId }],
      },
    }
  }

  forDelete(entity: IElement): Mutation {
    if (!entity.id) {
      throw new Error(`Element can't be deleted without id`)
    }

    return {
      mutation: `
        upsert {
            query {
              var(func: uid(${entity.id}))  @filter(type(Element))  @recurse {
                ELEMENT AS uid
                children @filter(NOT has(componentTag))
              }

              elements(func: uid(ELEMENT))  {
                name
                uid
                props {
                  PROP_UID as uid
                }
                componentTag {
                  TAG_UID as uid
                }
              }

              parent(func: uid(${entity.id})) {
                ~children {
                  PARENT as uid
                }
              }
          }

          mutation {
            delete {
              uid(PROP_UID) * * .
              uid(TAG_UID) * * .
              uid(ELEMENT) * * .
              uid(PARENT) <children> <${entity.id}> .
            }
          }
        }
      `,
    }
  }
}
