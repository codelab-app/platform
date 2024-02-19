import { ExternalCopy, Isolate } from 'isolated-vm'

export const safeEval = (code: string, response: object) => {
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
