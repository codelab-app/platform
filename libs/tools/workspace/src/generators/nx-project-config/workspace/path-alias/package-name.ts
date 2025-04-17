/**
 * This function is fully tested based on our project test data.
 */
export const convertToPackageName = (projectName: string) => {
  // If the path already starts with @codelab-codegen, return it as is
  if (projectName.startsWith('@codelab-codegen/')) {
    return projectName
  }

  // For paths that match the pattern @codelab/frontend-application-*/... with segments after /src/
  // These are paths that point to directories under src/ and should maintain their slash structure
  if (projectName.match(/@codelab\/frontend-application-[^/]+\/[^/]+/)) {
    return projectName
  }

  // For paths in the format @codelab/backend-infra-adapter/something
  // These should be transformed to @codelab/backend-infra-adapter-something
  if (projectName.match(/@codelab\/[^/]+-[^/]+-[^/]+\/[^/]+/)) {
    const parts = projectName.split('/')
    const prefix = parts[0] + '/' + parts[1]
    const suffix = parts.slice(2).join('-')

    return `${prefix}-${suffix}`
  }

  // Standard @codelab/ paths with multiple slashes should convert all slashes to hyphens
  if (projectName.startsWith('@codelab/') && projectName.includes('/')) {
    const withoutPrefix = projectName.replace('@codelab/', '')

    return `@codelab/${withoutPrefix.replace(/\//g, '-')}`
  }

  // For simple paths that include a single slash but don't match above patterns
  if (projectName.includes('/') && !projectName.startsWith('@')) {
    return projectName.replace('/', '-')
  }

  // Return the original name for anything else
  return projectName
}
