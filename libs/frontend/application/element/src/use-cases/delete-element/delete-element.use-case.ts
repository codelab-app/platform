import { type IElementModel } from '@codelab/frontend/abstract/domain'
import { deleteElementAction } from '@codelab/frontend-domain-element/actions'

export const deleteElementUseCase = async (element: IElementModel) => {
  const descendantIds = element.descendantElements.map(
    (descendant) => descendant.id,
  )

  const id_IN = [element.id].concat(descendantIds)

  /**
   * delete props
   */
  await deleteElementAction({ id_IN }, { props: { where: {} } })

  // TODO: refresh elements
}
