import type { worker as WorkerNamespace } from 'monaco-editor'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as worker from 'monaco-editor/esm/vs/editor/editor.worker'
import { CSSInJsWorker, ICreateData } from './CSSInJsWorker'

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any

ctx.onmessage = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    worker.initialize(
      (
        workerContext: WorkerNamespace.IWorkerContext,
        createData: ICreateData,
      ) => {
        return new CSSInJsWorker(workerContext, createData)
      },
    )
  } catch (err) {
    throw err
  }
}
