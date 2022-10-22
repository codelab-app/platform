const graphqlApiHost =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`
    : `http://${process.env['NEXT_PUBLIC_BUILDER_HOST']}`

export const graphqlApiOrigin = `${graphqlApiHost}/api/graphql`
