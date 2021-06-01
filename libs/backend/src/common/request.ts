import { INestApplication } from '@nestjs/common'
import { default as supertestRequest } from 'supertest'

export const request = (app: INestApplication) =>
  supertestRequest(app).post('/graphql').timeout(30000)

export type ApiResponse<T = Record<string, any>> = {
  body: T
  status: number
}
