import type { Nullable } from '@codelab/shared/abstract/types'
import type { Options } from 'sucrase'

export interface IExpressionTransformer {
  context: Nullable<object>
  initialized: boolean
  transform: Nullable<
    (code: string, options: Options) => { code: string | null }
  >
  init(): Promise<void>
  transpileAndEvaluateExpression(expression: string): unknown
}
