export const deleteDomain = (name: string) => {
  return fetch(`/api/vercel/domain?name=${name}`, {
    method: 'DELETE',
  })
}
