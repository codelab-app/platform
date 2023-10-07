export const postApiRequest = <T>(url: string, body?: object) => {
  return cy.request<T>({
    body,
    method: 'POST',
    timeout: 10000,
    url,
  })
}
