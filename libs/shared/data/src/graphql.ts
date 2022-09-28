export const apiOrigin = String(
  process.env['NEXT_PUBLIC_API_ORIGIN'] ||
    `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`,
)
