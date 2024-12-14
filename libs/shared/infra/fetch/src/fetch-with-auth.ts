/**
 * Used by Nest.js
 */
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const response = await fetch(endpoint, options)

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response
}
