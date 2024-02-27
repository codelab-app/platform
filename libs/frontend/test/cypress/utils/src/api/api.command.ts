import path from 'path'

export const postApiRequest = <T>(url: string, body?: object) => {
  return cy.request<T>({
    body,
    method: 'POST',
    timeout: 60000,
    url: path.join('/api', url),
  })
}
