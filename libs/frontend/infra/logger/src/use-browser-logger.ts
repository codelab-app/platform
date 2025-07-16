import { useMemo } from 'react'

import {
  type BrowserLoggerService,
  createBrowserLogger,
} from './browser-logger.service'

/**
 * React hook for creating a namespaced logger instance.
 * The logger instance is memoized to avoid recreating it on every render.
 *
 * @param namespace - The namespace for this logger instance (e.g., 'components:Button', 'hooks:useAuth')
 * @returns A namespaced logger instance
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const logger = useBrowserLogger('components:MyComponent')
 *
 *   useEffect(() => {
 *     logger.debug('Component mounted', {
 *       data: { props: { id: 123 } }
 *     })
 *   }, [])
 * }
 * ```
 */
export const useBrowserLogger = (namespace: string): BrowserLoggerService => {
  return useMemo(() => createBrowserLogger(namespace), [namespace])
}
