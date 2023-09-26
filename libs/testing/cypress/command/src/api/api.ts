// import { getEnv } from '@codelab/shared/config'

export const postApiRequest = <T>(url: string) => {
  return cy.getAllCookies().then((cookie) => {
    return cy.request<T>({
      // headers: {
      // cookie,
      // Authorization: `Bearer ${accessToken}`,
      // },
      method: 'POST',
      timeout: 10000,
      url,
    })
  })
}
