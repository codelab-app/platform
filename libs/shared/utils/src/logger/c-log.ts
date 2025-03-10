/* eslint-disable @typescript-eslint/member-ordering */
import type { ObjectLike } from '@codelab/shared/abstract/types'

/**
 * To show the correct source file in browser console, enable ignore list
 *
 * https://developer.chrome.com/docs/devtools/settings/ignore-list
 *
 * Add `/c-log\.ts$` pattern
 *
 */
class Logger {
  info(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    const formatted = this.formatMessage(...objects)

    console.info(...formatted)
  }

  error(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    const formatted = this.formatMessage(...objects)

    console.error(...formatted)
  }

  warn(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    const formatted = this.formatMessage(...objects)

    console.warn(...formatted)
  }

  debug(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    const formatted = this.formatMessage(...objects)

    console.debug(...formatted)
  }

  /**
   * Formatting will not show objects as expandable
   */
  private formatMessage(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    return objects.map((obj) => {
      if (obj && typeof obj === 'object') {
        return JSON.stringify(obj, null, 2)
      }

      return obj
    })
  }
}

export const logger = new Logger()
