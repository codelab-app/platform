import type {
  IElementModel,
  IElementRepository,
} from '@codelab/frontend/abstract/core'
import type {
  ElementOptions,
  ElementUniqueWhere,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { elementApi } from '../store'

@model('@codelab/ElementRepository')
export class ElementRepository extends Model({}) implements IElementRepository {
  @modelFlow
  add = _async(function* (this: ElementRepository, element: IElementModel) {
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
  delete = _async(function* (
    this: ElementRepository,
    elements: Array<IElementModel>,
  ) {
    console.debug('ElementRepository.delete()', elements)

    const {
      deleteElements: { nodesDeleted },
    } = yield* _await(
      elementApi.DeleteElements({
        delete: {
          props: {},
        },
        where: {
          id_IN: elements.map((element) => element.id),
        },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  find = _async(function* (
    this: ElementRepository,
    where: ElementWhere,
    options?: ElementOptions,
  ) {
    return yield* _await(elementApi.GetElements({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (
    this: ElementRepository,
    where: ElementUniqueWhere,
  ) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (this: ElementRepository, element: IElementModel) {
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

  // This seems to be faster when there are fewer fields attached when updating
  @modelFlow
  updateNodes = _async(function* (
    this: ElementRepository,
    element: IElementModel,
  ) {
    console.log(element.toJson)

    const {
      updateElements: { elements },
    } = yield* _await(
      elementApi.UpdateElements({
        update: element.toUpdateNodesInput(),
        where: { id: element.id },
      }),
    )

    return elements[0]!
  })
}
