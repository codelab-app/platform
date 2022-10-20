const graphqlApiHost =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env['NEXT_PUBLIC_VERCEL_URL']}`
    : process.env['NEXT_PUBLIC_BUILDER_URL']!

export const graphqlApiOrigin = `${graphqlApiHost}/api/graphql`
