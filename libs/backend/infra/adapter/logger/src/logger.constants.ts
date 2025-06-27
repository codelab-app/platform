import type { LogLevel } from '@nestjs/common'

/**
 * Allowed logging namespace modules for the backend
 */
export const LOGGING_MODULES = {
  COMMAND: 'command',
  GRAPHQL: 'graphql',
  NEO4J: 'neo4j',
  REPOSITORY: 'repository',
  SERVICE: 'service',
} as const

export type LoggingModule =
  (typeof LOGGING_MODULES)[keyof typeof LOGGING_MODULES]

/**
 * Log levels that include the data field
 */
export const DATA_INCLUSIVE_LEVELS: ReadonlyArray<LogLevel> = [
  'verbose',
  'debug',
  'error',
  'fatal',
] as const

/**
 * Common namespace patterns
 */
export const NAMESPACE_PATTERNS = {
  ALL: '*',
  EXCLUSION_PREFIX: '-',
  SEPARATOR: ':',
  WILDCARD: '*',
} as const

/**
 * Example namespace configurations
 */
export const NAMESPACE_EXAMPLES = {
  ALL_COMMAND: `${LOGGING_MODULES.COMMAND}:*`,
  // Module-level patterns
  ALL_GRAPHQL: `${LOGGING_MODULES.GRAPHQL}:*`,
  ALL_NEO4J: `${LOGGING_MODULES.NEO4J}:*`,
  ALL_REPOSITORY: `${LOGGING_MODULES.REPOSITORY}:*`,
  ALL_SERVICE: `${LOGGING_MODULES.SERVICE}:*`,

  COMMAND_CREATE: `${LOGGING_MODULES.COMMAND}:create`,

  GRAPHQL_RESOLVER: `${LOGGING_MODULES.GRAPHQL}:resolver`,
  // Specific patterns
  NEO4J_QUERY: `${LOGGING_MODULES.NEO4J}:query`,
  // Exclusion patterns
  NO_DEPRECATION: `-${LOGGING_MODULES.NEO4J}:deprecation`,

  REPOSITORY_USER: `${LOGGING_MODULES.REPOSITORY}:user`,

  SERVICE_AUTH: `${LOGGING_MODULES.SERVICE}:auth`,
} as const

/**
 * Validates if a namespace follows the expected pattern
 */
export const isValidNamespace = (namespace: string): boolean => {
  if (!namespace || namespace.trim() === '') {
    return false
  }

  // Remove exclusion prefix if present
  const cleanNamespace = namespace.startsWith(
    NAMESPACE_PATTERNS.EXCLUSION_PREFIX,
  )
    ? namespace.substring(1)
    : namespace

  // Check if it's a wildcard
  if (cleanNamespace === NAMESPACE_PATTERNS.ALL) {
    return true
  }

  // Check if it starts with a valid module
  const parts = cleanNamespace.split(NAMESPACE_PATTERNS.SEPARATOR)
  const module = parts[0] as LoggingModule

  return Object.values(LOGGING_MODULES).includes(module)
}

/**
 * Parse namespace patterns from environment variable
 */
export const parseNamespaces = (namespaceString: string): Array<string> => {
  if (!namespaceString) {
    return []
  }

  return namespaceString
    .split(',')
    .map((ns) => ns.trim())
    .filter((ns) => ns.length > 0)
}

/**
 * Check if a namespace is enabled based on patterns
 */
export const isNamespaceEnabled = (
  namespace: string,
  patterns: Array<string>,
): boolean => {
  if (!patterns.length) {
    return false
  }

  let isEnabled = false

  for (const pattern of patterns) {
    // Handle exclusion patterns
    if (pattern.startsWith(NAMESPACE_PATTERNS.EXCLUSION_PREFIX)) {
      const excludePattern = pattern.substring(1)

      if (matchesPattern(namespace, excludePattern)) {
        return false
      }
    } else if (matchesPattern(namespace, pattern)) {
      isEnabled = true
    }
  }

  return isEnabled
}

/**
 * Check if a namespace matches a pattern (with wildcard support)
 */
const matchesPattern = (namespace: string, pattern: string): boolean => {
  // Direct match
  if (namespace === pattern || pattern === NAMESPACE_PATTERNS.ALL) {
    return true
  }

  // Convert pattern to regex
  const regexPattern = pattern
    .split(NAMESPACE_PATTERNS.WILDCARD)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*')

  const regex = new RegExp(`^${regexPattern}$`)

  return regex.test(namespace)
}
