import { env } from '@codelab/shared/config/env'

export const SUSPENSE_TIMEOUT = env.get('E2E').asBoolStrict() ? 0 : 0

/**
 * @deprecated Careful when using
 */
export const waitForTimeout = (ms: number = SUSPENSE_TIMEOUT) =>
  new Promise((resolve) => setTimeout(resolve, ms))
