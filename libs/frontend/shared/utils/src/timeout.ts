import { env } from '@codelab/shared/config/env'
import { sleep } from 'radash'

export const SUSPENSE_TIMEOUT = env.get('E2E').asBoolStrict() ? 0 : 0

/**
 * @deprecated Careful when using
 */
export const waitForTimeout = (ms: number = SUSPENSE_TIMEOUT) => sleep(ms)
