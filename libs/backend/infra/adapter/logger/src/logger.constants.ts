import {
  DATA_INCLUSIVE_LEVELS,
  isNamespaceEnabled as sharedIsNamespaceEnabled,
  NAMESPACE_PATTERNS,
  parseNamespaces as sharedParseNamespaces,
} from '@codelab/shared-infra-logger'

export { DATA_INCLUSIVE_LEVELS }

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

  // Special case for @neo4j/graphql namespaces
  if (cleanNamespace.startsWith('@neo4j/graphql')) {
    return true
  }

  // Check if it starts with a valid module
  const parts = cleanNamespace.split(NAMESPACE_PATTERNS.SEPARATOR)
  const module = parts[0] as LoggingModule

  return Object.values(LOGGING_MODULES).includes(module)
}

/**
 * Parse namespace patterns from environment variable
 * Delegates to shared implementation
 */
export const parseNamespaces = (namespaceString: string): Array<string> => {
  return sharedParseNamespaces(namespaceString)
}

/**
 * Check if a namespace is enabled based on patterns
 * Delegates to shared implementation
 */
export const isNamespaceEnabled = (
  namespace: string,
  patterns: Array<string>,
): boolean => {
  return sharedIsNamespaceEnabled(namespace, patterns)
}
