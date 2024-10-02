import type { ObjectLike } from '@codelab/shared/abstract/types'

import { ExternalCopy, Isolate } from 'isolated-vm'

/**
 * Moved to own package after facing issue with `jest`, where `node` extension needs to be added for specs to run, due to `isolated-vm`
 */
export const safeEval = (code: string, response: ObjectLike) => {
  const isolate = new Isolate({ memoryLimit: 8 })
  const context = isolate.createContextSync()
  const jail = context.global

  jail.setSync('global', jail.derefInto())
  jail.setSync(
    'response',
    new ExternalCopy(response, { transferOut: true }).copyInto(),
  )

  return context.evalClosureSync(code, [], { result: { copy: true } })
}
