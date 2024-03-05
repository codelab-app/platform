import path from 'path'

export const postApiRequest = <T>(url: string, body?: object) => {
  const absoluteUrl = new URL(
    path.join('/api', url),
    Cypress.env('platformApiHost'),
  )

  return cy.request<T>({
    body,
    method: 'POST',
    timeout: 60000,
    url: absoluteUrl.toString(),
  })
}
