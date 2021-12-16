import { CreateResponsePort } from '@codelab/backend/abstract/core'
import {
  DgraphEntityType,
  DgraphRepository,
  ITransaction,
} from '@codelab/backend/infra'
import { IElement } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { IElementRepository } from './element-repository.interface'
import { HooksRepository } from './hooks.repository'
import { PropMapBindingsRepository } from './prop-map-bindings.repository'
import { PropsRepository } from './props.repository'

@Injectable()
export class ElementRepository implements IElementRepository {
  constructor(protected dgraph: DgraphRepository) {}

  // TODO move this to tags.repository.ts
  public static componentTagJson(
    ownerId?: string | null,
    name?: string | null,
  ) {
    return {
      'dgraph.type': [DgraphEntityType.Tag],
      owner: ownerId ? null : { uid: ownerId },
      name,
      isRoot: true,
    }
  }

  protected getParentId(elementId: string, transaction: ITransaction) {
    const query = `{
          query(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId})) @normalize {
            ~children {
              parentId: uid
            }
          }
        }`

    return (
      this.dgraph.getOneNamed<{ parentId?: string }>(
        transaction,
        query,
        'query',
      ) ?? { parentId: undefined }
    )
  }

  async save(
    element: IElement,
    transaction: ITransaction,
  ): Promise<CreateResponsePort> {
    const uid = element.id ?? DgraphRepository.randomBlankNode()

    const existingParentId = element.id
      ? await this.getParentId(element.id, transaction)
      : undefined

    // Delete the old parent-child relationship
    const deleteNquads =
      existingParentId && existingParentId !== element.parentElementId
        ? `<${existingParentId}> <children> <${element.id}> .`
        : undefined

    const jsonMutation = {
      uid,
      'dgraph.type': [DgraphEntityType.Element],
      name: element.name,
      owner: element.ownerId ? { uid: element.ownerId } : undefined,
      'children|order': element.order ?? 1,
      // we don't want to update the atom here, it's a separate aggregate root
      atom: element.atom ? { uid: element.atom.id } : undefined,
      props: PropsRepository.mutation(element.props),
      css: element.css,
      hooks: element.hooks?.map(HooksRepository.mutation) ?? [],
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
      propTransformationJs: element.propTransformationJs,
      // we don't want to update the atom here, it's a separate aggregate root
      instanceOfComponent: element.instanceOfComponent
        ? { uid: element.instanceOfComponent.id }
        : undefined,
      propMapBindings:
        element.propMapBindings?.map(PropMapBindingsRepository.mutation) ?? [],
      componentTag: element.componentTag
        ? ElementRepository.componentTagJson(element.ownerId, element.name)
        : undefined,
      componentFixedId: element.componentTag
        ? element.componentFixedId ?? v4()
        : null,
    }

    const setJson = element.parentElementId
      ? {
          uid: element.parentElementId,
          children: jsonMutation,
        }
      : jsonMutation

    const response = await transaction.mutate({
      setJson,
      deleteNquads,
    })

    return {
      id: element.id ?? this.dgraph.getUid(response, jsonMutation.uid),
    }
  }
}
