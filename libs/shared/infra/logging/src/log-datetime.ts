export const logDatetime = (message: string) => {
  const nowInSeconds = Math.round(Date.now() / 1000)

  console.log(message, nowInSeconds)
}
