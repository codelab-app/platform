export const LOCAL_STORAGE_JWT_TOKEN_KEY = 'token'

export const getAuthTokenFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)

export const storeAuthTokenInLocalStorage = (authToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, authToken)
}

export const clearAuthTokenInLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
}
