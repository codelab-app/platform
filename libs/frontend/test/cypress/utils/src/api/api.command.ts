export const postApiRequest = <T>(url: string, body?: object) => {
  cy.getAllCookies().then((cookies) => {
    const accessToken = cookies.find((cookie) => cookie.name === 'access_token')
    const idToken = cookies.find((cookie) => cookie.name === 'id_token')
    const appSession = cookies.find((cookie) => cookie.name === 'app_session')

    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join(';')

    return cy.request<T>({
      body,
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
        Cookie: cookieString,
        'x-app-session': appSession?.value,
        'X-ID-Token': idToken?.value,
      },
      method: 'POST',
      timeout: 10000,
      url,
    })
  })
}
