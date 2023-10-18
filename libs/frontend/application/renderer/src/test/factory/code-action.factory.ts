import { IActionKind, type ICodeActionDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<ICodeActionDTO>(({ params }) => {
  const dto: ICodeActionDTO = {
    __typename: IActionKind.CodeAction as 'CodeAction',
    code:
      params.code ??
      `function run() {
      console.log('hello from code action factory')
    }`,
    id: params.id ?? v4(),
    name: params.name ?? 'renderPropType',
    store: { id: params.store?.id ?? v4() },
  }

  testRootStore.actionService.add(dto)

  return dto
})
