import supertestRequest from 'supertest'

export const request = (app: any) =>
  supertestRequest(app).post('/graphql').timeout(30000)
