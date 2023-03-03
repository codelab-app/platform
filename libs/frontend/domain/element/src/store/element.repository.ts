import type {
  IElement,
  IElementRepository,
} from '@codelab/frontend/abstract/core'
import type { ElementWhere } from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { elementApi } from '../store'

@model('@codelab/ElementRepository')
export class ElementRepository extends Model({}) implements IElementRepository {
  @modelFlow
  add = _async(function* (this: ElementRepository, element: IElement) {
    const {
      createElements: { elements },
    } = yield* _await(
      elementApi.CreateElements({
        input: element.toCreateInput(),
      }),
    )

    return elements[0]!
  })

  @modelFlow
  update = _async(function* (this: ElementRepository, element: IElement) {
    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        update: element.toUpdateInput(),
        where: { id: element.id },
      }),
    )

    return elements[0]!
  })

  @modelFlow
  find = _async(function* (this: ElementRepository, where: ElementWhere) {
    const { elements } = yield* _await(elementApi.GetElements({ where }))

    return elements
  })

  @modelFlow
  delete = _async(function* (this: ElementRepository, ids: Array<string>) {
    const {
      deleteElements: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElements({
        delete: {
          props: {},
        },
        where: {
          id_IN: ids,
        },
      }),
    )

    return nodesDeleted
  })

  // @modelFlow
  // deleteMany = _async(function* (this: ElementRepository, ids: Array<string>) {
  //   const {
  //     deleteElements: { nodesDeleted },
  //   } = yield* _await(
  //     elementApi.DeleteElements({
  //       delete: {
  //         props: {},
  //       },
  //       where: {
  //         id_IN: ids,
  //       },
  //     }),
  //   )

  //   return nodesDeleted
  // })
}
