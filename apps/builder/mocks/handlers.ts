import { graphql } from 'msw'
import { apps, createApps } from './data/apps'

export const mockCreateAppsHandler = jest.fn((_, res, ctx) => {
  console.log('create ap tarara')

  return res(ctx.data({ createApps }))
})

export const mockGetApps = jest.fn((req, res, ctx) => {
  console.log('dmo getasaasd')

  return res(
    ctx.data({
      apps,
    }),
  )
})

export const handlers = [
  graphql.query('GetApps', mockGetApps),
  graphql.mutation('CreateApps', mockCreateAppsHandler),
]
