export const fetchParams = {
  headers: {
    Authorization: `Bearer ${process.env['AUTHORIZATION_TOKEN']}`,
    'Content-Type': 'application/json',
  },
}
