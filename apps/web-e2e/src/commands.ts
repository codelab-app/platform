export const getTimestamp = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date())

export const logTimestamp = (message?: string) => {
  console.log(`[${getTimestamp()}] ${message}`)
}
