/* eslint-disable @typescript-eslint/member-ordering */
import type { ObjectLike } from '@codelab/shared/abstract/types'

import { isPlainObject } from 'remeda'

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
   * Format messages without stringifying complex objects to avoid circular reference errors
   */
  private formatMessage(
    ...objects: Array<boolean | number | string | ObjectLike | null | undefined>
  ) {
    return objects.map((obj) => {
      // Only stringify plain objects that aren't cyclic
      if (obj && typeof obj === 'object' && isPlainObject(obj)) {
        try {
          return JSON.stringify(obj, null, 2)
        } catch (error) {
          // If stringification fails, return the object as is
          return obj
        }
      }

      return obj
    })
  }
}

export const logger = new Logger()
