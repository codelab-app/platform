import { isServer } from '@codelab/frontend'

export const LOCAL_STORAGE_JWT_TOKEN_KEY = 'token'

export const getAuthTokenFromLocalStorage = () => {
  if (isServer) return null

  return localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
}

export const storeAuthTokenInLocalStorage = (authToken: string) => {
  if (isServer) return

  localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, authToken)
}

export const clearAuthTokenInLocalStorage = () => {
  if (isServer) return

  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
}
