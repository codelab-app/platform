/**
 * Shared namespace validation utilities for logger configuration
 */

export const NAMESPACE_PATTERNS = {
  ALL: '*',
  EXCLUSION_PREFIX: '-',
  SEPARATOR: ':',
  WILDCARD: '*',
} as const

/**
 * Parse namespace patterns from string (e.g., "service:*,component:*,-component:debug")
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
 * Check if a namespace matches a pattern (with wildcard support)
 */
export const matchesPattern = (namespace: string, pattern: string): boolean => {
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
 * Parse and separate enabled/disabled namespaces
 */
export const parseNamespaceConfig = (
  namespaceString: string,
): {
  enabled: Set<string>
  disabled: Set<string>
} => {
  const enabled = new Set<string>()
  const disabled = new Set<string>()

  if (!namespaceString) {
    return { disabled, enabled }
  }

  const namespaces = parseNamespaces(namespaceString)

  for (const namespace of namespaces) {
    if (namespace.startsWith(NAMESPACE_PATTERNS.EXCLUSION_PREFIX)) {
      disabled.add(namespace.substring(1))
    } else {
      enabled.add(namespace)
    }
  }

  return { disabled, enabled }
}
