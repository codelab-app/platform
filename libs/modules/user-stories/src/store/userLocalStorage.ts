export const LOCAL_STORAGE_KEY_AUTH_TOKEN = 'AUTH_TOKEN'

export const getAuthTokenFromLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_TOKEN)

export const storeAuthTokenInLocalStorage = (authToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_TOKEN, authToken)
}

export const clearAuthTokenInLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_TOKEN)
}
