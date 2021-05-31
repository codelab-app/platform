import { INestApplication } from '@nestjs/common'
import supertestRequest from 'supertest'

export const request = (app: INestApplication) =>
  supertestRequest(app).post('/graphql').timeout(30000)
